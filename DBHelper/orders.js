export const order_query = {
  CREATENEWORDER: "INSERT INTO orders VALUES(?,?,?,?,NOW());",
  UPDATEORDER: "UPDATE orders SET status=? WHERE order_id = ?;",
  CHECKEXISTING:
    "SELECT order_id from orders WHERE user_id = ? and status = 'pending';",
};

export const order_items_query = {
  CREATEORDERITEMS: "INSERT INTO order_items VALUES ?",
};

export const myOrder_query = {
  GETALLORDERS:
    "SELECT orders.order_id ,  products.name, orders.total_amount , orders.status , orders.created_at , products.id , products.image ,  order_items.quantity , order_items.price \
from products, orders , order_items \
WHERE \
products.id = order_items.product_id and orders.order_id = order_items.order_id AND \
orders.status != 'pending' and orders.user_id = ? order by created_at;",
};
