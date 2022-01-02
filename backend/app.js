const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}



var allowedOrigins = ['http://localhost:3000',
                      'http://localhost:3001'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(null, true);
    }
    return callback(null, true);
  }, credentials: true
}));
//app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "uploads")));

const category = require("./routes/category");
const product = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");
const productSlider = require("./routes/productSlider");
const page = require("./routes/page");
const cart = require("./routes/cart");
const payment = require("./routes/paymentRoute");



app.use("/api", category);
app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", productSlider);
app.use("/api", page);
app.use("/api", cart);
app.use("/api", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
