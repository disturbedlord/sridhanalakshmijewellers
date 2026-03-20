import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import pool from "../db.js";
import { razorpay_create_order } from "../DBHelper/queries.js";
import { v4 as uuidv4 } from "uuid";
import {
  CreateSchemeSubscription,
  MarkInstallmentStatus,
} from "./common/Schemes.js";
import { logger } from "../pinoLogger.js";
import { Middleware } from "./commonRoute.js";
import { LogError } from "../Logger/LogHelper.js";
import { GenericError } from "../APIHelper/commonMethods.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const CreateRazorpayOrder = async (req, res) => {
  try {
    logger.info(req.body);

    const { installment_id, amount } = req.body;
    const options = {
      amount: Math.round(Number(amount) * 100), // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    console.log("Avinash : ", options);

    const order = await razorpay.orders.create(options);
    logger.info(order);
    const query = await pool.query(razorpay_create_order, [
      uuidv4(),
      installment_id,
      order.id,
      amount,
      "created",
    ]);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const VerifyPayments = async (req, res) => {
  try {
    const { payment } = req.body;
    console.log(req.body);
    const body = payment.razorpay_order_id + "|" + payment.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === payment.razorpay_signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "invalid payment" });
    }
  } catch (err) {
    logger.info(`Verify Payment Error ${err}`);
    res.status(500);
  }
};

export const Webhooks = async (req, res) => {
  try {
    logger.info("Webhook reached");
    const event = req.body.event;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).send("Invalid signature");
    }

    await pool.query(
      `INSERT INTO payment_logs (razorpay_event, webhook_signature, payload)
 VALUES (?, ?, ?)`,
      [event, signature, JSON.stringify(req.body)],
    );

    // 2️⃣ Process event
    if (event === "payment.captured") {
      logger.info("Payment success");

      const payment = req.body.payload.payment.entity;

      const razorpayPaymentId = payment.id;
      const razorpayOrderId = payment.order_id;

      // update payments table
      const [rows] = await pool.query(
        "SELECT status FROM payments WHERE razorpay_order_id=?",
        [razorpayOrderId],
      );

      if (rows[0].status !== "success") {
        // process payment
        if (MarkPaymentStatus(razorpayOrderId, razorpayPaymentId, "success"))
          logger.info(
            "Payment Marked Success for Razorpay Order Id : ",
            razorpayOrderId,
          );
      }
      // update installments table
      if (MarkInstallmentStatus(rows[0]?.installment_id, new Date(), "paid"))
        logger.info(
          "Installment Updated for Installment_id : ",
          rows[0]?.installment_id,
        );
    } else if (event === "payment.failed") {
      logger.info("Payment failed");

      const payment = req.body.payload.payment.entity;

      const razorpayOrderId = payment.order_id;
      const failureReason = payment.error_description;

      await pool.query(
        "UPDATE payments SET status=?, failure_reason=? WHERE razorpay_order_id=?",
        ["failed", failureReason, razorpayOrderId],
      );
    } else if (event === "refund.processed") {
      logger.info("Refund processed");

      const refund = req.body.payload.refund.entity;

      const razorpayPaymentId = refund.payment_id;
      const refundId = refund.id;
      const amount = refund.amount;

      await pool.query(
        `UPDATE payments 
     SET status=?, refund_id=?, refunded_amount=? 
     WHERE razorpay_payment_id=?`,
        ["refunded", refundId, amount, razorpayPaymentId],
      );
    } else if (event === "refund.failed") {
      logger.error("Refund failed");

      const refund = req.body.payload.refund.entity;

      await pool.query(
        "UPDATE payments SET refund_status=? WHERE refund_id=?",
        ["failed", refund.id],
      );
    } else if (event === "payment.authorized") {
      logger.info("Payment authorized");

      const payment = req.body.payload.payment.entity;

      await pool.query(
        "UPDATE payments SET status=? WHERE razorpay_order_id=?",
        ["authorized", payment.order_id],
      );
    }

    res.status(200).send("ok");
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
};

export const MarkPaymentStatus = async (req, res) => {
  try {
    const {
      installment_id,
      razorpay_order_id,
      razorpay_payment_id,
      status,
      order_id,
    } = req.body;
    console.log("1 : ", req.body);
    const response = await MarkPaymentStatusLogic(
      installment_id,
      razorpay_order_id,
      razorpay_payment_id,
      status,
      order_id,
    );

    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response);
    }
  } catch (err) {
    LogError("MarkPaymentStatus", err);
    GenericError(res);
  }
};
export const MarkPaymentStatusLogic = async (
  installment_id,
  razorpay_order_id,
  razorpay_payment_id,
  status,
  order_id,
) => {
  try {
    console.log(
      installment_id,
      razorpay_order_id,
      razorpay_payment_id,
      status,
      order_id,
    );

    const UpdatePaymentQuery =
      "UPDATE payments SET razorpay_payment_id = ?,\
    status = ?,\
    installment_id = ?,\
     order_id = ? \
     WHERE razorpay_order_id = ? ";
    console.log(UpdatePaymentQuery);
    const [query] = await pool.query(UpdatePaymentQuery, [
      razorpay_payment_id,
      status,
      installment_id,
      order_id,
      razorpay_order_id,
    ]);
    console.log(query);
    if (query.affectedRows === 1) return { success: true };
    else
      return {
        success: false,
        error: " Update Failed for MarkPaymentStatusLogic",
      };
  } catch (err) {
    logger.info("MarkPaymentStatusLogic Failed with error : ", err);
    return false;
  }
};
