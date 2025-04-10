const express = require("express");
const orderControllers = require("../controllers/orderControllers");
const verifyToken = require("./middleware");
const router = express.Router();

router.post("/createOrder/:id", verifyToken, orderControllers.addOrder);
router.delete("/deleteOrder");
router.put("/updateOrder");
router.get("/getAllOrdersByUserId", verifyToken, orderControllers.getAllOrdersByUserId);
router.get("/getAllOrderByUserIdForMonthYear/:id", orderControllers.getAllOrderByUserIdForMonthYear);
router.get("/getAllOrderOfUserInMonth");

module.exports = router;
