/**
 * ============================================================
 * SaveURL Controller
 * ============================================================
 * Creates a new short URL in the database.
 *
 * Flow:
 *   1. Receive longUrl from the request body
 *   2. Generate a unique shortId with nanoid
 *   3. Save both to MongoDB
 *   4. Return the full short URL so frontend can show it
 *
 * Response shape (success):
 *   {
 *     ok: true,
 *     shortId: "abc1234",
 *     shortURL: "http://localhost:5050/api/urls/abc1234",
 *     longUrl: "https://example.com/..."
 *   }
 */

import { URLs } from "../models/url.js";
import { generateShortId } from "../utils/keys.js";

export const SaveURL = async (req, res) => {
  try {
    const { longUrl } = req.body;

    // Basic validation
    if (!longUrl || typeof longUrl !== "string" || !longUrl.trim()) {
      return res.status(400).json({
        ok: false,
        error: "longUrl is required and must be a non-empty string",
      });
    }

    // Make sure it looks like a URL (very light check)
    const trimmed = longUrl.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      return res.status(400).json({
        ok: false,
        error: "longUrl must start with http:// or https://",
      });
    }

    // Generate a short unique ID (7 characters is a good balance)
    const shortId = generateShortId(7);

    // Create and save the document
    const newURL = new URLs({
      longUrl: trimmed,
      shortId: shortId,
    });

    await newURL.save();

    // Build the full short URL that the frontend will display & use.
    // When someone visits this URL, the RedirectURL controller will run.
    // Priority:
    //   1. BASE_URL from .env (best for production – set this on Vercel)
    //   2. The actual host that received this request (works automatically on Vercel)
    //   3. localhost fallback for pure local development
    let baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
      const host = req.headers["x-forwarded-host"] || req.get("host") || `localhost:${process.env.PORT || 5050}`;
      baseUrl = `${protocol}://${host}`;
    }
    // Keep the same path your routes already use: /api/urls/:shortId
    const shortURL = `${baseUrl}/api/urls/${shortId}`;

    return res.status(200).json({
      ok: true,
      shortId: shortId,
      shortURL: shortURL,
      longUrl: trimmed,
    });
  } catch (err) {
    console.error("SaveURL error:", err);

    // Handle duplicate key error (very rare with nanoid, but possible)
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        error: "Short ID collision. Please try again.",
      });
    }

    return res.status(500).json({
      ok: false,
      error: "Internal server error while creating short URL",
    });
  }
};
