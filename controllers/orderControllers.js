const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ordersModels = require("../models/ordersModels");
const foodItemsModels = require("../models/foodItemsModels");

// add order with userId and foodId
const addOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy từ middleware verifyToken
    const foodId = req.params.id;
    const { quantity, orderDate, statusOrder } = req.body;
    console.log(quantity);
    console.log(orderDate);
    console.log(statusOrder);
    // Kiểm tra dữ liệu đầu vào
    if (!quantity || !orderDate || !statusOrder) {
      return res.status(400).json({
        status: 0,
        message: "Thiếu dữ liệu: quantity, orderDate hoặc statusOrder!",
      });
    }

    const now = new Date();
    const food = await foodItemsModels.getDetailFoodItemById(foodId);
    // Lấy ngày có thể đặt món (available_date từ food)
    const availableDate = new Date(food.available_date);

    
    // Tạo thời gian deadline: 10h sáng ngày availableDate
    const deadline = new Date(availableDate);
    deadline.setHours(10, 0, 0, 0); // 10:00:00.000

    // So sánh
    if (now > deadline) {
      return res.status(400).json({
        status: 0,
        message: "Đã quá hạn đặt món (sau 10h sáng ngày phục vụ)!",
      });
    }

    const newOrderId = await ordersModels.addOrder(
      userId,
      foodId,
      quantity,
      orderDate,
      statusOrder
    );

    return res.status(201).json({
      status: 1,
      message: "Tạo đơn hàng thành công!",
      orderId: newOrderId,
    });
  } catch (err) {
    console.error("Lỗi tạo đơn hàng:", err);
    return res.status(500).json({
      status: 0,
      message: "Đã xảy ra lỗi khi tạo đơn hàng!",
    });
  }
};

// delete order by
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ordersModels.removeOrder(id);
    if (!result) {
      res.status(500).json({ status: 0, message: "Lỗi khi xoá" });
    }
    res.status(500).json({ status: 1, message: "Xoá thành công" });
  } catch (err) {
    console.error("Lỗi khi xoá đơn hàng theo userId:", err);
    res.status(500).json({ status: 0, message: err });
  }
};

// get All order of user
const getAllOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId); // lấy userId từ middleware verifyToken
    const orders = await ordersModels.getAllOrdersByUserId(userId);
    console.log(orders);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Lỗi khi lấy đơn đặt theo userId:", error);
    res.status(500).json({ success: false, message: "Error server" });
  }
};

const getAllOrderByUserIdForMonthYear = async (req, res) => {
  const { id } = req.params;
  const { month, year } = req.body;
  console.log(id);
  try {
    const result = await ordersModels.getAllOrderByUserIdForMonthYear(
      id,
      month,
      year
    );
    console.log("--------list order------");
    console.log(result);
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.error("Lỗi khi lấy đơn hàng theo userId:", error);
    res.status(500).json({ status: 0, message: "Error server" });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  getAllOrdersByUserId,
  getAllOrderByUserIdForMonthYear,
};
