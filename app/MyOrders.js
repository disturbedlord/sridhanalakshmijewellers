import { GenericError } from "../APIHelper/commonMethods.js";
import pool from "../db.js";
import { myOrder_query } from "../DBHelper/orders.js";
import { LogError } from "../Logger/LogHelper.js";

export const GetAllPaidOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const [allOrders] = await pool.query(myOrder_query.GETALLORDERS, [userId]);
    const grouped = {};
    if (allOrders.length > 0) {
      for (let i = 0; i < allOrders.length; i++) {
        const row = allOrders[i];

        // 1️⃣ Group by order_id
        if (!grouped[row.order_id]) {
          grouped[row.order_id] = {
            order_id: row.order_id,
            total_amount: row.total_amount,
            status: row.status,
            created_at: row.created_at,
            items: {},
          };
        }

        const order = grouped[row.order_id];

        // 2️⃣ Group inside by product id
        if (!order.items[row.id]) {
          order.items[row.id] = {
            id: row.id,
            name: row.name,
            image: row.image,
            price: row.price,
            quantity: 0,
          };
        }

        // 3️⃣ Aggregate quantity (important if duplicates exist)
        order.items[row.id].quantity += row.quantity;
      }
    }
    // Convert nested objects → arrays
    const result = Object.values(grouped).map((order) => ({
      ...order,
      items: Object.values(order.items),
    }));
    console.log(allOrders);
    res.status(200).json({ success: true, my_orders: result });
  } catch (err) {
    LogError("GetAllPaidOrders", err);
    GenericError(res);
  }
};
