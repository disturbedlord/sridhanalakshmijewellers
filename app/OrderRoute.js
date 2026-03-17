import { GenericError } from "../APIHelper/commonMethods.js";
import pool from "../db.js";
import { order_items_query, order_query } from "../DBHelper/orders.js";
import { LogError } from "../Logger/LogHelper.js";
import { v4 as uuidv4 } from "uuid";

export const CreateNewOrder = async (req, res) => {
  try {
    const { userId, totalAmount } = req.body;
    const orderId = uuidv4();

    const [query] = await pool.query(order_query.CREATENEWORDER, [
      orderId,
      userId,
      totalAmount,
      "pending",
    ]);
    if (query.affectedRows === 1) {
      return res.status(200).json({ success: true, orderId: orderId });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Create New Order Insert Failed" });
    }
  } catch (err) {
    LogError(CreateNewOrder, err);
    GenericError(res);
  }
};

export const UpdateOrderStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    const [query] = await pool.query(order_query.UPDATEORDER, [
      status,
      orderId,
    ]);
    if (query.affectedRows === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Update Order Status Failed" });
    }
  } catch (err) {
    LogError(UpdateOrderStatus, err);
    GenericError(res);
  }
};

export const AddOrderItemsToOrder = async (req, res) => {
  try {
    const { orderId, orderItems } = req.body;
    const insertQuery = [];
    for (let i = 0; i < orderItems.length; i++) {
      const { productId, quantity, price } = orderItems[i];
      insertQuery.push([uuidv4(), orderId, productId, quantity, price]);
    }

    const [query] = await pool.query(order_items_query.CREATEORDERITEMS, [
      insertQuery,
    ]);
    if (query.affectedRows === orderItems.length) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Add Order Items To Order Failed" });
    }
  } catch (err) {
    LogError("AddOrderItemsToOrder", err);
    GenericError(res);
  }
};
