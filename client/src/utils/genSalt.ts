import crypto from "crypto";

export function generateSalt() {
    return crypto.randomBytes(64).toString("hex");
  }