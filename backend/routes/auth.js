/**
 * ============================================================
 * Auth Routes
 * ============================================================
 * Endpoints for creating accounts and logging in.
 *
 *   POST /api/auth/signup  → create a new user
 *   POST /api/auth/login   → log an existing user in
 */

import express from "express";
import { Signup, Login } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);

export default router;
