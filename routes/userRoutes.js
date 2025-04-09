const express = require("express");

const userController = require("../controllers/userControllers");

const router = express.Router();

router.post("/createNewUser", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/getAllUsers", userController.getAllUsers);
router.delete("/deleteUser/:id", userController.deleteUser);


module.exports = router;
