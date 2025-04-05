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
    const token = jwt.sign({ userId }, "thanh");

    // Lưu thông tin đăng nhập vào session
    req.session.loggedin = true;
    req.session.username = username;

    // return token
    return res.status(200).json({
      status: 1,
      message: "Register successfully",
      token: token,
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

    // Lưu thông tin đăng nhập vào session
    req.session.loggedin = true;
    req.session.username = username;
    var role = user;
    if (username == "admin") {
      role = "admin";
    }
    return res
      .status(201)
      .json({ status: 1, message: "Login successful!", role: role, token });
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

module.exports = {
  register,
  login,
  logout,
};
