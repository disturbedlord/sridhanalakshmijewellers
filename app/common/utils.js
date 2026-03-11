import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export function generateAccessToken(user_id) {
  return jwt.sign(
    { userId: user_id, type: "access" },
    process.env.JWT_SECRET, // JWT secret from .env
    { expiresIn: "1h" },
  );
}

export function generateRefreshToken(userId, deviceId) {
  return {
    refreshToken: jwt.sign(
      {
        sub: userId,
        device_id: deviceId,
        jti: uuidv4(),
        type: "refresh",
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    ),
    expiresIn: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
  };
}
