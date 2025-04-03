const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

require("dotenv").config();


const app = express();

// Cấu hình Express để phục vụ tệp tĩnh từ thư mục 'assets'
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(cors());



// Declare routes for the app
const userRoutes = require("./routes/userRoutes");



// use routes 
app.use("/api/user", userRoutes);


// Định nghĩa route chính và điều hướng đến trang HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html')); // Đảm bảo đường dẫn đúng tới file HTML
});


// Khởi độhg server
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`);
})


