/**
 * ============================================================
 * User Model (Mongoose Schema)
 * ============================================================
 * Stores accounts created via the Signup form.
 *
 * Fields:
 *   name     – full name of the user
 *   email    – unique login email (lowercase)
 *   password – hashed with bcrypt (never store plain text!)
 *   createdAt / updatedAt – automatic timestamps
 *
 * Collection name in MongoDB will be "users".
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,          // MongoDB will reject duplicate emails
      lowercase: true,       // always store as lowercase
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,          // basic minimum length
    },
  },
  {
    timestamps: true,        // adds createdAt and updatedAt automatically
  }
);

// Export the model so controllers can use it
export const User = mongoose.model("users", UserSchema);
