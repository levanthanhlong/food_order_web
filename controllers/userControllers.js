const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModels = require("../models/usersModels");

const register = async (req, res) => {
  const { username, fullname, password, role, employeeCode } = req.body;
  try {
    const isExistUser = await userModels.findUserByUserName(username);
    if (isExistUser) {
      return res.status(400).json({
        status: 0,
        message: "User already exists!",
      });
    }

    //get userId after register successfully
    const userId = await userModels.addUser(
      username,
      password,
      fullname,
      role,
      employeeCode
    );
    //create token when register successfully
    // const token = jwt.sign({ userId }, "thanh");

    // // Lưu thông tin đăng nhập vào session
    // req.session.loggedin = true;
    // req.session.username = username;

    // return token
    return res.status(200).json({
      status: 1,
      message: `Create user + ${username} + successfully`,
    });
  } catch (e) {
    console.log(`error ${e}`);
    return res.status(500).json({
      status: 0,
      message: "An error occurred, please try again later!",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // get user with username to check user exist
    const user = await userModels.findUserByUserName(username);

    //check user is not exist
    if (!user) {
      return res.status(400).json({
        status: 0,
        message: "Incorrect username",
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: 0,
        message: "Incorrect password",
      });
    }

    // get user id from database
    const userId = user.id;
    // Tạo JWT token với userID
    const token = jwt.sign({ userId }, "thanh");
    console.log(token);
    // Lưu thông tin đăng nhập vào session
    req.session.loggedin = true;
    req.session.username = username;
    var role = user;
    if (username == "admin") {
      role = "admin";
    }
    return res
      .status(201)
      .json({
        status: 1,
        message: "Login successful!",
        role: role,
        token: token,
      });
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: "An error occurred, please try again later!",
    });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/login");
  });
};

const getAllUsers = async (req, res) => {
  try {
    const result = await userModels.getAllUsers();
    return res
      .status(200)
      .json({ status: 1, message: "Get list users successful", data: result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 0, message: "Error when get list users", error: err });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userModels.deleteUserById(id);
    if (!result) {
      return res
        .status(400)
        .json({ status: 0, message: "Error when delete user" });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Delete user successful" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 0, message: "Error when delete user", error: err });
  }
};

const getUserInfoById = async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy userId từ token
    const user = await userModels.findUserById(userId);

    if (!user) {
      return res.status(404).json({ status: 0, message: "User not found!" });
    }

    res.status(200).json({
      status: 1,
      message: "User info fetched successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 0, message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllUsers,
  deleteUser,
  getUserInfoById,
};
