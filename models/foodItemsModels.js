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

// get detail food item by id 
const getDetailFoodItemById = async (id) => {
  const [result] =  await db.query(
    "SELECT * FROM food_items WHERE Id = ?",
    [id]
  );
  // console.log(result);
  return result.length > 0 ? result[0] : [];
}

// Delete Food Item by Id
const deleteFoodItemById = async (id) => {
  const [result] = await db.query(
    "DELETE FROM food_items WHERE Id = ?",
    [id]
  );
  return result.affectedRows;
};

// get food items on this week
const getFoodItemOnThisWeek = async () => {
  const query = `
    SELECT * FROM food_items 
    WHERE available_date BETWEEN 
      DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
      AND DATE_ADD(CURDATE(), INTERVAL (6 - WEEKDAY(CURDATE())) DAY)
    ORDER BY available_date ASC;
  `;

  const [result] = await db.query(query);
  return result;
};

// Get All Food Items
// const getAllFoodItems = async () => {
//   const [result] = await db.query("SELECT * FROM food_items ORDER BY food_items.available_date DESC");
//   return result;
// };
const getAllFoodItems = async () => {
  const [result] = await db.query(`
    SELECT 
      food_items.*, 
      COALESCE(SUM(orders.quantity), 0) AS total_ordered 
    FROM food_items
    LEFT JOIN orders ON food_items.id = orders.food_id
    GROUP BY food_items.id
    ORDER BY food_items.available_date DESC
  `);
  return result;
};


// get all food items im month
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
  getAllFoodItemsInMonth,
  getDetailFoodItemById,
  getFoodItemOnThisWeek
};
