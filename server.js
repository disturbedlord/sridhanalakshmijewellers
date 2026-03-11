// server.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import { formatString, user_devices_insert } from "./queries.js";
import { v4 as uuidv4 } from "uuid";
import {
  CreateRazorpayOrder,
  VerifyPayments,
  Webhooks,
} from "./app/razorpay.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./app/common/utils.js";
import { Login, RefreshToken, Register } from "./app/AuthRoute.js";
import { GetAllSchemes, GetMetalPrice, Middleware } from "./app/commonRoute.js";
import {
  GetAllInstallmentsHistory,
  GetAllUserSchemes,
  GetUserScheme,
} from "./app/common/Schemes.js";
import { logger } from "./pinoLogger.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Allow all domains to make requests (you can restrict it later)

// Register a new user
app.post("/auth/register", Register);

// Login user
app.post("/auth/login", Login);

// Generate Refresh Token
app.post("/auth/refreshToken", RefreshToken);

// Get All Schemes
app.get("/common/schemes", Middleware, GetAllSchemes);
app.get("/common/getMetalPrice", Middleware, GetMetalPrice);

// Create Order on Razorpay
app.post("/razorpay/create-order", Middleware, CreateRazorpayOrder);
// Verify Payment from Razorpay
app.post("/razorpay/verify-payment", Middleware, VerifyPayments);
// Razorpay Webhook
app.post("/razorpay/webhook", Webhooks);

// app.post("/user/schemes/schemeSubscribe", CreateSchemeSubscription);
// app.post("/user/schemes/createInstallments", CreateInstallmentRecords);
app.post("/user/schemes/getAllUserSchemes", Middleware, GetAllUserSchemes);
app.post("/user/schemes/getUserScheme", Middleware, GetUserScheme);

// Get All User Installments against userSchemeId
app.post(
  "/user/schemes/getAllUserInstallments",
  Middleware,
  GetAllInstallmentsHistory,
);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
