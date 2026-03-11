import jwt from "jsonwebtoken";
import pool from "../db.js";
import { logger } from "../pinoLogger.js";

export const GetAllSchemes = async (req, res) => {
  try {
    // Fetch the user info from DB
    const [rows] = await pool.query("SELECT * FROM schemes;");

    res.json({
      schemes: rows,
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const GetMetalPrice = async (req, res) => {
  try {
    // Fetch the user info from DB
    const [rows] = await pool.query(
      "SELECT * FROM metalPrice order by created_at desc LIMIT 1;",
      [],
    );
    res.status(200).json({
      latestPrice: rows,
    });
  } catch (err) {
    res.status(500);
  }
};

export const Middleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

let visitors = 0;
export const RegisterVisitors = (req, res) => {
  logger.info("Visitor Hi");

  visitors++;
  res.status(204).json("Hi Visitor");
};
