const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

async function checkConnection() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Kết nối MySQL thành công!");
        connection.release(); // Giải phóng kết nối
    } catch (error) {
        console.error("❌ Lỗi kết nối MySQL:", error.message);
    }
}

//check connection
checkConnection();

module.exports = db;