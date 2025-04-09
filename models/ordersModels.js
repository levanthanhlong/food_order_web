const db = require("../config/database");

const convertToMySQLDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};
// add order
const addOrder = async (userId, foodId, quantity, orderDate, statusOrder) => {
  const formattedDate = convertToMySQLDateTime(orderDate); // convert trước khi lưu

  const [result] = await db.query(
    "INSERT INTO orders (user_id, food_id, quantity, order_date, status) VALUES (?, ?, ?, ?, ?)",
    [userId, foodId, quantity, formattedDate, statusOrder]
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
// get all orders by userId with food name
const getAllOrdersByUserId = async (userId) => {
  const [result] = await db.query(`
    SELECT 
      orders.id,
      orders.food_id,
      food_items.name_food,
      orders.quantity,
      orders.order_date,
      orders.status,
      orders.created_at
    FROM orders
    JOIN food_items ON orders.food_id = food_items.id
    WHERE orders.user_id = ?
    ORDER BY orders.id DESC
  `, [userId]);

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
  getAllOrdersByUserId,
  getAllOrderByUserIdForMonthYear
};
