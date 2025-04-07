const path = require('path');

const renderHomePage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/user/home.html"));
};

const renderHomeAdminPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin/admin_home.html"));
};

const renderLoginPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

const renderCreateFoodItem = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin/food_item_create.html"));
}

module.exports = {
  renderHomePage,
  renderHomeAdminPage,
  renderLoginPage,
  renderCreateFoodItem
};
