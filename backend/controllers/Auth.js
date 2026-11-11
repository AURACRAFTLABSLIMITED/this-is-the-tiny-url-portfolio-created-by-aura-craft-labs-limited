/**
 * ============================================================
 * Auth Controllers – Signup & Login
 * ============================================================
 * These functions handle creating new accounts and logging in.
 *
 * Security notes for beginners:
 *   - We NEVER store the plain password.
 *   - We use bcryptjs to hash the password before saving.
 *   - On login we compare the typed password with the hash.
 */

import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ---------- Validation ----------
    if (!name || !email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Name, email and password are all required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        error: "Password must be at least 6 characters",
      });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        ok: false,
        error: "An account with this email already exists",
      });
    }

    // ---------- Hash the password ----------
    // 10 is a good balance between security and speed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ---------- Save the new user ----------
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    await newUser.save();

    // Return success (we do NOT send the password back)
    return res.status(201).json({
      ok: true,
      message: "Account created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);

    // Handle MongoDB duplicate key error (extra safety)
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        error: "An account with this email already exists",
      });
    }

    return res.status(500).json({
      ok: false,
      error: "Internal server error while creating account",
    });
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ---------- Validation ----------
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email and password are required",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Invalid email or password",
      });
    }

    // Compare the typed password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        error: "Invalid email or password",
      });
    }

    // Login successful
    return res.status(200).json({
      ok: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error while logging in",
    });
  }
};
