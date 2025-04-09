const { data } = require("autoprefixer");
const foodItemsModels = require("../models/foodItemsModels");

// add food item
const addFoodItem = async (req, res) => {
  try {
    const { name_food, description, price, available_date } = req.body;
    const image = req.file;

    const imageUrl = image ? `/resources/img_foods/${image.filename}` : null;
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

// delete food item by id
const deleteFoodItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = foodItemsModels.deleteFoodItemById(id);
    if (!result) {
      return res
        .status(400)
        .json({ status: 0, message: "Error delete food items" });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Delete food item successful" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 0, message: "Error retrieving food items", error: err });
  }
};

// get detail food item
const getDetailFoodItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await foodItemsModels.getDetailFoodItemById(id);
    if (!result) {
      return res
        .status(400)
        .json({ status: 0, message: "Error load food items" });
    }
    console.log(result);
    return res
      .status(200)
      .json({ status: 1, message: "Load food items successful", data: result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 0, message: `Error load food items: ${err}` });
  }
};

// update food item by id
const updateFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameFood, description, price, availableDate } = req.body;

    const image = req.file;

    const imageUrl = image ? `/resources/img_foods/${image.filename}` : null;
    const result = await foodItemsModels.updateFoodItemById(
      id,
      nameFood,
      description,
      price,
      imageUrl,
      availableDate
    );

    if (result === 0) {
      return res
        .status(400)
        .json({ status: 0, message: "Error when update food item" });
    }

    return res.status(200).json({ status: 1, message: "Update successful" });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({
      status: 0,
      message: "Error when update food item",
      error: err.message,
    });
  }
};

// get food item on this week
const getFoodItemsOnThisWeek = async (req, res) => {
  try {
    const result = await foodItemsModels.getFoodItemOnThisWeek();

    return res
      .status(200)
      .json({
        status: 1,
        message: "Load list of food items on this week successful",
        data: result,
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 0, message: `Error load list of food items: ${err}` });
  }
};

module.exports = {
  addFoodItem,
  getAllFoodItems,
  deleteFoodItemById,
  updateFoodItemById,
  getDetailFoodItemById,
  getFoodItemsOnThisWeek,
};
