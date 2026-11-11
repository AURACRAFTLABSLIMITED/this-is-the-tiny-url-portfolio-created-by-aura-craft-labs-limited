/**
 * ============================================================
 * TinyURL Backend – Main Entry Point
 * ============================================================
 * This is the heart of the backend server.
 * What it does:
 *   1. Creates an Express app
 *   2. Enables CORS so the React frontend (port 3000) can talk to us
 *   3. Parses JSON request bodies
 *   4. Connects to MongoDB
 *   5. Mounts URL routes and Auth routes under /api
 *   6. Starts listening on port 5050
 *
 * How a beginner can change things later:
 *   - Change PORT in .env or here
 *   - Add more routes by creating new files in /routes
 *   - Adjust CORS origin if you deploy frontend elsewhere
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectMongoDb } from "./utils/mongodb.js";
import URLRoute from "./routes/urls.js";
import AuthRoute from "./routes/auth.js";

// Load environment variables from .env file (MONGODB_URI, PORT, etc.)
dotenv.config();

const app = express();

// Needed on Vercel / reverse proxies so req.protocol and host are correct
app.set("trust proxy", 1);

// ------------------------------------------------------------
// CORS Configuration
// ------------------------------------------------------------
// We allow the frontend (running on localhost:3000 in development)
// to make requests to this backend. Without this, the browser
// blocks the requests for security reasons (Same-Origin Policy).
// Allow local dev + any Vercel deployment of this project.
// Same-origin requests on Vercel (frontend + /api rewrite) also work fine.
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server, curl, redirects)
    if (!origin) return callback(null, true);

    const allowed = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ].filter(Boolean);

    if (allowed.includes(origin) || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    return callback(null, true); // permissive for portfolio/demo; tighten later if needed
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Parse incoming JSON bodies (required for POST requests)
app.use(express.json());

// Connect to MongoDB Atlas (or local MongoDB)
ConnectMongoDb();

// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------
// URL shortener endpoints
//   POST /api/urls/save
//   GET  /api/urls/:shortId
//   GET  /api/health
app.use("/api", URLRoute);

// Authentication endpoints
//   POST /api/auth/signup
//   POST /api/auth/login
app.use("/api/auth", AuthRoute);

// Simple root message
app.get("/", (req, res) => {
  res.json({
    message: "TinyURL Backend is running 🚀",
    docs: {
      health: "GET /api/health",
      createUrl: "POST /api/urls/save  { longUrl: 'https://...' }",
      redirect: "GET /api/urls/:shortId",
      signup: "POST /api/auth/signup  { name, email, password }",
      login: "POST /api/auth/login   { email, password }",
    },
  });
});

// ------------------------------------------------------------
// Start the server
// ------------------------------------------------------------
const PORT = process.env.PORT || 5050;

// Vercel runs the exported app itself, so we only listen when running locally
export default app;

if (!process.env.VERCEL) app.listen(PORT, () => {
  console.log("");
  console.log("✅ MongoDB connection initiated");
  console.log(`🚀 TinyURL Backend is running`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Health:  http://localhost:${PORT}/api/health`);
  console.log(`   Signup:  POST http://localhost:${PORT}/api/auth/signup`);
  console.log(`   Login:   POST http://localhost:${PORT}/api/auth/login`);
  console.log("");
});
