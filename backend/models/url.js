/**
 * ============================================================
 * URL Model (Mongoose Schema)
 * ============================================================
 * Defines how a short URL document looks in MongoDB.
 *
 * Fields:
 *   shortId  – the unique short code (e.g. "abc1234")
 *   longUrl  – the original full website address
 *   createdAt – automatically added by Mongoose timestamps
 *
 * Collection name in MongoDB will be "urls" (lowercase plural).
 */

import mongoose from "mongoose";

const URLSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true, // MongoDB will enforce uniqueness
      index: true,  // makes lookups by shortId very fast
    },
    longUrl: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the model so controllers can use it
// "urls" is the name of the collection in MongoDB
export const URLs = mongoose.model("urls", URLSchema);
