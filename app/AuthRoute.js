import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { generateAccessToken, generateRefreshToken } from "./common/utils.js";
import { user_devices_insert } from "../queries.js";
import { logger } from "../pinoLogger.js";

export const Register = async (req, res) => {
  const { name, mobile_no, password } = req.body;
  logger.info(name, mobile_no, password);
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const [rows] = await pool.query(
      "INSERT INTO users (user_id , name, mobile_no, pwd_hash) VALUES (UUID() , ?, ?, ?)",
      [name, mobile_no, hashedPassword],
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: rows.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const Login = async (req, res) => {
  const { device_data, mobile_no, password } = req.body;
  logger.info(device_data, mobile_no, password);
  try {
    // Check if user exists
    const [rows] = await pool.query("SELECT * FROM users WHERE mobile_no = ?", [
      mobile_no,
    ]);
    logger.info(rows[0]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if password matches
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.pwd_hash);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    logger.info("0");

    // Create Refresh Token
    const { expiresIn, refreshToken } = generateRefreshToken(
      rows[0].iser_id,
      device_data.deviceId,
    );

    logger.info("1", expiresIn, refreshToken);

    const refresh_hash = await bcrypt.hash(refreshToken, 10);

    // create an entry in user_devices
    await pool.query(user_devices_insert, [
      rows[0].user_id,
      device_data.deviceId,
      device_data.device_name,
      device_data.platform,
      device_data.app_version,
      device_data.build_number,
      refresh_hash,
      expiresIn,
      rows[0].user_id,
      device_data.deviceId,
      device_data.device_name,
      device_data.platform,
      device_data.app_version,
      device_data.build_number,
      refresh_hash,
      expiresIn,
    ]);

    // Create JWT token
    const accessToken = generateAccessToken(user.user_id);

    res.json({
      userMobileNo: user.mobile_no,
      userId: user.user_id,
      name: user.name,
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const RefreshToken = async (req, res) => {
  try {
    const { device_data, refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    // verify jwt
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const userId = payload.user_id;
    const deviceId = payload.device_id;

    // check device binding
    if (deviceId !== device_data.device_id) {
      return res.status(401).json({ message: "Device mismatch" });
    }

    // lookup device session
    const [rows] = await db.query(
      `
      SELECT *
      FROM user_devices
      WHERE user_id = ?
      AND device_id = ?
      AND is_active = true
      `,
      [userId, deviceId],
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Session not found" });
    }

    const device = rows[0];

    if (await bcrypt.compare(device.refresh_token_hash, tokenHash)) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // generate new tokens
    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId, deviceId);

    const newHash = await bcrypt.hash(newRefreshToken, 10);

    // rotate refresh token
    await db.query(
      `
      UPDATE user_devices
      SET refresh_token_hash = ?,
          refresh_token_expires_at = DATE_ADD(NOW(), INTERVAL 30 DAY),
          last_used_at = NOW()
      WHERE user_id = ?
      AND device_id = ?
      `,
      [newHash, userId, deviceId],
    );

    return res.json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
