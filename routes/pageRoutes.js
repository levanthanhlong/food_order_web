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

router.get(
  "/homeAdmin/createFoodItem",
  pageController.renderCreateFoodItemPage
);
router.get("/homeAdmin/updateFoodItem/:id",authController.requireLogin, pageController.renderFoodItemEditPage);

router.get("/homeAdmin/userManagerPage", authController.requireLogin,pageController.renderUserManagerPage);

router.get("/homeAdmin/createUserPage", authController.requireLogin,pageController.renderCreateUserPage);


module.exports = router;
