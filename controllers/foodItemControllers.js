const foodItemsModels = require("../models/foodItemsModels");

// add food item
const addFoodItem = async (req, res) => {
  try {
    const { name_food, description, price, available_date } = req.body;
    const image = req.file;
    console.log(name_food);
    const imageUrl = image ? `/resources/img_foods/${image.filename}` : null;
    console.log("---------");
    const foodItemId = await foodItemsModels.addFoodItem(
      name_food,
      description,
      price,
      imageUrl,
      available_date
    );
    console.log(foodItemId);
    return res
      .status(201)
      .json({ status: 1, message: "Create food item successful!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 0, message: err });
  }
};

// get all food items

const getAllFoodItems = async (req, res) => {
  try {
    // Lấy tất cả món ăn từ database
    const foodItems = await foodItemsModels.getAllFoodItems();
    // Kiểm tra xem có món ăn nào không
    if (foodItems.length == 0) {
      return res
        .status(404)
        .json({ status: 0, message: "No food items found" });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Success", data: foodItems });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 0, message: "Error retrieving food items", error: err });
  }
};

module.exports = {
  addFoodItem,
  getAllFoodItems,
};
