const db = require("../config/database");
const bcrypt = require("bcryptjs");

// add Food Item
const addFoodItem = async (
  nameFood,
  description,
  price,
  imageUrl,
  availableDate
) => {
  const [result] = await db.query(
    "INSERT INTO food_items (name_food, description, price, image_url, available_date) VALUES (?, ?, ?, ?, ?)",
    [nameFood, description, price, imageUrl, availableDate]
  );
  console.log('---------');
  return result.insertId;
};

// update Food Item by Id
const updateFoodItemById = async (
  id,
  nameFood,
  description,
  price,
  imageUrl,
  availableDate
) => {
  const [result] = await db.query(
    `UPDATE food_items
       SET name_food = ?, description = ?, price = ?, image_url = ?, available_date = ?
       WHERE id = ?`,
    [nameFood, description, price, imageUrl, availableDate, id]
  );

  return result.affectedRows;
};

// Delete Food Item by Id
const deleteFoodItemById = async (id) => {
  const [result] = await db.query(
    "DELETE FROM food_items WHERE Id = ?",
    [id]
  );
  return result.affectedRows;
};

// Get All Food Items
const getAllFoodItems = async () => {
  const [result] = await db.query("SELECT * FROM food_items");
  return result;
};

const getAllFoodItemsInMonth = async (month, year) => {
  const query = `
    SELECT * FROM food_items 
    WHERE MONTH(available_date) = ? AND YEAR(available_date) = ? 
    ORDER BY available_date ASC
  `;
  
  const [result] = await db.query(query, [month, year]);
  return result;
};




module.exports = {
  addFoodItem,
  updateFoodItemById,
  deleteFoodItemById,
  getAllFoodItems,
  getAllFoodItemsInMonth
};
