/**
 * ============================================================
 * RedirectURL Controller
 * ============================================================
 * Looks up a shortId and redirects the browser to the original long URL.
 *
 * Example:
 *   User visits → http://localhost:5050/api/urls/abc1234
 *   We find the document → redirect(302) to https://example.com/...
 *
 * If the shortId does not exist we return a 404 JSON response.
 */

import { URLs } from "../models/url.js";

export const RedirectURL = async (req, res) => {
  try {
    const { shortId } = req.params;

    if (!shortId) {
      return res.status(400).json({
        ok: false,
        error: "shortId is required",
      });
    }

    // Find the document by shortId
    const found = await URLs.findOne({ shortId: shortId });

    if (!found) {
      return res.status(404).json({
        ok: false,
        error: "Short URL not found",
      });
    }

    // 302 Temporary Redirect is the classic choice for URL shorteners
    // (you can change to 301 if you want permanent redirects)
    return res.redirect(302, found.longUrl);
  } catch (err) {
    console.error("RedirectURL error:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error while redirecting",
    });
  }
};
