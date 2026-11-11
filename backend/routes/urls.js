/**
 * ============================================================
 * URL Routes
 * ============================================================
 * This file only defines the paths (endpoints).
 * The actual logic lives in the controllers folder.
 *
 * Endpoints:
 *   GET  /api/health          → check if server is alive
 *   POST /api/urls/save       → create a new short URL
 *   GET  /api/urls/:shortId   → redirect to the original long URL
 *
 * Why /api prefix?
 *   It keeps all backend APIs under one namespace.
 *   Makes it easy to add more features later (auth, analytics, etc.)
 */

import express from "express";
import { SaveURL } from "../controllers/SaveURL.js";
import { RedirectURL } from "../controllers/RedirectURL.js";

const router = express.Router();

// Health check – useful for debugging and for frontend to know backend is up
router.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "Backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Create a short URL
// Frontend sends: POST /api/urls/save  with body { longUrl: "https://..." }
router.post("/urls/save", SaveURL);

// Redirect short URL to original
// Example: GET /api/urls/abc1234  → 302 redirect to the long URL
router.get("/urls/:shortId", RedirectURL);

export default router;
