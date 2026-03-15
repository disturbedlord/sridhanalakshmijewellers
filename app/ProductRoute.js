import { GenericError } from "../APIHelper/commonMethods.js";
import pool from "../db.js";
import { cart_query } from "../DBHelper/cart.js";
import { cart_items_query } from "../DBHelper/cart_items.js";
import { LogError } from "../Logger/LogHelper.js";
import { v4 as uuidv4 } from "uuid";

export const GetProductDetails = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const query = "SELECT * from products WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    if (result.length > 0) {
      res.status(200).json({ status: 1, data: result });
    } else {
      res.status(204).json({ status: 0, data: null });
    }
  } catch (err) {
    LogError("GetProductDetails", err);
    return GenericError(res);
  }
};

export const CreateCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const newCartId = uuidv4();
    const [result] = await pool.query(cart_query.INSERT, [newCartId, userId]);
    if (result.affectedRows === 1) {
      return res
        .status(200)
        .json({ success: true, result: { cartId: newCartId } });
    } else {
      return res.status(500).json({ success: false, error: "Insert failed" });
    }
  } catch (err) {
    LogError("CreateCart", err);
    return GenericError(res);
  }
};

export const AddItemToCart = async (req, res) => {
  try {
    const { cartId, productId, qty } = req.body;

    const [existingQty] = await pool.query(
      cart_items_query.CHECKEXISTINGPRODUCT,
      [cartId, productId],
    );
    let result;
    if (existingQty.length === 1) {
      // Update existing cart item
      [result] = await pool.query(cart_items_query.UPDATEITEM, [
        existingQty[0].quantity + 1,
        cartId,
        productId,
      ]);
    } else {
      // Create new Cart Item
      [result] = await pool.query(cart_items_query.INSERTNEW, [
        uuidv4(),
        cartId,
        productId,
        qty,
      ]);
    }

    if (result.affectedRows === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: "Insert failed" });
    }
  } catch (err) {
    LogError("AddItemToCart", err);
    return GenericError(res);
  }
};

export const GetCart = async (req, res) => {
  try {
    const { cartId } = req.body;

    const [result] = await pool.query(cart_items_query.GETCART, [cartId]);

    if (result.length > 0) {
      return res.status(200).json({ success: true, items: result });
    } else {
      return res.status(500).json({ success: false, error: "Insert failed" });
    }
  } catch (err) {
    LogError("GetCart", err);
    return GenericError(res);
  }
};
