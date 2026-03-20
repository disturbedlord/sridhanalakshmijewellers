// server.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import { v4 as uuidv4 } from "uuid";
import {
  CreateRazorpayOrder,
  MarkPaymentStatus,
  VerifyPayments,
  Webhooks,
} from "./app/razorpay.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./app/common/utils.js";
import { Login, RefreshToken, Register } from "./app/AuthRoute.js";
import {
  GetAllSchemes,
  GetMetalPrice,
  Middleware,
  RegisterVisitors,
} from "./app/commonRoute.js";
import {
  GetAllInstallmentsHistory,
  GetAllUserSchemes,
  GetUserScheme,
} from "./app/common/Schemes.js";
import { logger } from "./pinoLogger.js";
import { GetAllProducts } from "./app/ShopRoute.js";
import {
  CreateCart,
  GetCart,
  GetProductDetails,
  ModifyItemInCart,
} from "./app/ProductRoute.js";
import {
  AddAddress,
  DeleteAddress,
  GetAddresses,
  UpdateAddress,
} from "./app/CheckoutRoute.js";
import {
  AddOrderItemsToOrder,
  CreateNewOrder,
  GetExistingOrder,
  UpdateOrderStatus,
} from "./app/OrderRoute.js";
import { CreateInstallment } from "./app/Installments.js";
import { GetAllPaidOrders } from "./app/MyOrders.js";
import { UploadImage } from "./app/kottster.js";
import multer from "multer";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Allow all domains to make requests (you can restrict it later)
app.use("/assets", express.static("assets"));
// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/products");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

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

// Dummy Route to keep render always on
app.get("/common/visitors", RegisterVisitors);

// <------Payments Route ---->
app.post("/payments/updatePaymentStatus", Middleware, MarkPaymentStatus);

app.get("/shop/getProducts", Middleware, GetAllProducts);
app.post("/product/getProductDetail", Middleware, GetProductDetails);

app.post("/cart/createCart", Middleware, CreateCart);
app.post("/cart/modifyItemInCart", Middleware, ModifyItemInCart);
app.post("/cart/getCart", Middleware, GetCart);

// <------Addresses Route ----------->
app.post("/address/getAllAddress", Middleware, GetAddresses);
app.post("/address/addAddress", Middleware, AddAddress);
app.delete("/address/deleteAddress", Middleware, DeleteAddress);
app.post("/address/updateAddress", Middleware, UpdateAddress);

// <---------Orders Route ---------->
app.post("/orders/createNewOrder", Middleware, CreateNewOrder);
app.post("/orders/getExistingOrder", Middleware, GetExistingOrder);
app.post("/orders/updateOrderStatus", Middleware, UpdateOrderStatus);
app.post("/orders/addItemsToOrder", Middleware, AddOrderItemsToOrder);

// <---------Installment ROute ---------->
app.post("/installment/createInstallments", Middleware, CreateInstallment);

// <----------My Orders Route----------->
app.post("/myorders/getAllOrders", Middleware, GetAllPaidOrders);

// <-------Image Upload Route fom Kottster -------->
app.post("/kottster/products/imageUpload", upload.single("file"), UploadImage);
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
