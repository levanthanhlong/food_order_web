const db = require("../config/database");

// add order
const addOrder = async (userId, foodId, quantity, orderDate, statusOrder) => {
  const [result] = await db.query(
    "INSERT INTO orders (user_id, food_id, quantity, order_date, status VALUES (?, ?, ?, ?,? ,?)",
    [userId, foodId, quantity, orderDate, statusOrder]
  );
  return result.insertId;
};

// edit order
const editOrder = async (id, quantity, statusOrder) => {
  const [result] = await db.query(
    "UPDATE orders SET quantity = ?, status = ? WHERE id = ?",
    [quantity, statusOrder, id]
  );
  return result.affectedRows;
};

// remove order
const removeOrder = async (id) => {
  const [result] = await db.query("DELETE * FROM orders WHERE id = ?", [id]);
  return result.affectedRows;
};

// get all order
const getAllOrder = async () => {
  const [result] = await db.query("SELECT * FROM orders");
  return result;
};

// get all order by userId
const getAllOrderByUserId = async (userId) => {
  const [result] = await db.query("SELECT * FROM orders WHERE user_id = ?", [
    userId,
  ]);
  return result;
};

// get All order by userId for the month
const getAllOrderByUserIdForMonthYear = async (userId, month, year) => {
  const [result] = await db.query(
    `SELECT * FROM orders 
     WHERE user_id = ? 
     AND MONTH(order_date) = ? 
     AND YEAR(order_date) = ?`,
    [userId, month, year]
  );
  return result;
};


module.exports = {
  addOrder,
  editOrder,
  removeOrder,
  getAllOrder,
  getAllOrderByUserId,
  getAllOrderByUserIdForMonthYear
};
