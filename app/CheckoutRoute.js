import { GenericError } from "../APIHelper/commonMethods.js";
import pool from "../db.js";
import { address_query } from "../DBHelper/addresses.js";
import { LogError } from "../Logger/LogHelper.js";
import { v4 as uuidv4 } from "uuid";

export const GetAddresses = async (req, res) => {
  try {
    const { userId } = req.body;
    const [addresses] = await pool.query(address_query.GETALLADDRESS, [userId]);
    return res.status(200).json({ success: true, address: addresses });
  } catch (err) {
    LogError("GetAddresses", err);
    GenericError(res);
  }
};

export const DeleteAddress = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    await pool.query(address_query.DELETEADDRESS, [id]);
    return res.status(204).send();
  } catch (err) {
    LogError("GetAddresses", err);
    GenericError(res);
  }
};

export const AddAddress = async (req, res) => {
  try {
    const { userId, name, phone, line1, line2, city, state, pincode } =
      req.body;
    const uuid = uuidv4();

    const [result] = await pool.query(address_query.ADDNEWADDRESS, [
      uuid,
      userId,
      name,
      phone,
      line1,
      line2,
      city,
      state,
      pincode,
    ]);

    if (result.affectedRows === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: "Insert failed" });
    }
  } catch (err) {
    LogError("AddAddress", err);
    GenericError(res);
  }
};

export const UpdateAddress = async (req, res) => {
  try {
    const { id, name, phone, line1, line2, city, state, pincode } = req.body;
    console.log(req.body);
    const [result] = await pool.query(address_query.UPDATEADDRESS, [
      name,
      phone,
      line1,
      line2,
      city,
      state,
      pincode,
      id,
    ]);

    if (result.affectedRows === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: "Update failed" });
    }
  } catch (err) {
    LogError("UpdateAddress", err);
    GenericError(res);
  }
};
