/**
 * ============================================================
 * MongoDB Connection Helper
 * ============================================================
 * Reads MONGODB_URI from .env and connects once when the server starts.
 *
 * Free option: MongoDB Atlas (https://www.mongodb.com/atlas)
 * Local option: mongodb://127.0.0.1:27017/tinyurl
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectMongoDb = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is missing in .env file");
    console.error("   Create a .env file and add: MONGODB_URI=your_connection_string");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
};
