export const order_query = {
  CREATENEWORDER: "INSERT INTO orders VALUES(?,?,?,?,NOW());",
  UPDATEORDER: "UPDATE orders SET status=? WHERE order_id = ?;",
};

export const order_items_query = {
  CREATEORDERITEMS: "INSERT INTO order_items VALUES ?",
};
