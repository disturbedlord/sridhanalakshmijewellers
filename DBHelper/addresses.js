export const address_query = {
  GETALLADDRESS:
    "SELECT id , name , phone , line1 , line2 , city , state , pincode FROM addresses WHERE user_id = ?;",
  ADDNEWADDRESS: "INSERT INTO addresses VALUES(?,?,?,?,?,?,?,?,?,NOW());",
  DELETEADDRESS: "DELETE FROM addresses WHERE id= ?;",
  UPDATEADDRESS:
    "UPDATE addresses SET name=?,phone=?,line1=?,line2=?,city=?,state=?,pincode=? WHERE id=?;",
};
