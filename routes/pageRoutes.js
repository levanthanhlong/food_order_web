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
router.get("/homeAdmin/updateFoodItem/:id", pageController.renderFoodItemEditPage);

router.get("/homeAdmin/userManagerPage", pageController.renderUserManagerPage);

router.get("/homeAdmin/createUserPage", pageController.renderCreateUserPage);


module.exports = router;
