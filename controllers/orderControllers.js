const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ordersModels = require("../models/ordersModels");

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
const deleteOrder = async (req, res) => {};

// get All order of user 
const getAllOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId); // lấy userId từ middleware verifyToken
    const orders = await ordersModels.getAllOrdersByUserId(userId);
    console.log(orders);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng theo userId:", error);
    res.status(500).json({ success: false, message: "Error server" });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  getAllOrdersByUserId
};
