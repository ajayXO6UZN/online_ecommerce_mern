const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

const multer = require("multer");
const shortid = require("shortid");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.route("/order/new").post(isAuthenticatedUser, newOrder);
// router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, getAllOrders);

//router.post('/admin/order/update', upload.array("userImage"),isAuthenticatedUser,  updateOrder);


// router
//   .route("/admin/order/update")
//   .post(isAuthenticatedUser, updateOrder);
  router.route("/admin/order/update").post(isAuthenticatedUser,updateOrder);

//router.post('/admin/order/update', upload.array("userImage"),isAuthenticatedUser,  updateOrder);
//router.post('/admin/updateUser', upload.array("userImage"), updateUser);



module.exports = router;
