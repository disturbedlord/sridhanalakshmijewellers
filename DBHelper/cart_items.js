export const cart_items_query = {
  INSERTNEW: "INSERT INTO cart_items VALUES(?,?,?,?);",
  CHECKEXISTINGPRODUCT:
    "SELECT quantity FROM cart_items WHERE cart_id = ? and product_id = ?;",
  UPDATEITEM:
    "UPDATE cart_items SET quantity = ? where cart_id = ? and product_id = ?",
  GETCART:
    "SELECT ct.product_id , ct.quantity , p.name , p.price , p.image FROM cart_items ct , products p WHERE ct.product_id = p.id AND ct.cart_id = ?",
};
