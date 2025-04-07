const express = require("express");
const pageController = require("../controllers/pageControllers");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.get("/home", authController.requireLogin, pageController.renderHomePage);
router.get(
  "/homeAdmin",
  authController.requireLogin,
  authController.checkAdmin,
  pageController.renderHomeAdminPage
);
router.get("/login", pageController.renderLoginPage);

router.get("/homeAdmin/createFoodItem", pageController.renderCreateFoodItem);

module.exports = router;
