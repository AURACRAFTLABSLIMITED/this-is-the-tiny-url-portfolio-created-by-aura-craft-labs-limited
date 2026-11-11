/**
 * ============================================================
 * Short ID Generator
 * ============================================================
 * Uses the nanoid library to create URL-safe unique IDs.
 *
 * Example: generateShortId(7) → "xY9kP2m"
 *
 * Why nanoid?
 *   - Very fast
 *   - URL-safe characters
 *   - Extremely low chance of collision
 */

import { nanoid } from "nanoid";

export const generateShortId = (length = 7) => {
  return nanoid(length);
};
