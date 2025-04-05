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

module.exports = {
  renderHomePage,
  renderHomeAdminPage,
  renderLoginPage,
};
