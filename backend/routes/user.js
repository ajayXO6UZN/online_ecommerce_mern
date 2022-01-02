const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
    getAllUsers,
    
} = require("../controllers/user");
const {
    updateUser,
    loginAdminUser,
    registerAdminUser,
    deleteUserById
} = require("../controllers/admin/user");
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

router.post("/register", upload.array('userImage'), registerUser);

router.route("/login").post(loginUser);

router.route("/admin/allUsers").get(getAllUsers);

router.post('/admin/updateUser', updateUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/logout").get(logout);

router.route("/admin/deleteUser").delete(deleteUserById);

router.route("/password/forgot").post(forgotPassword);

router.post('/admin/login', upload.array("userImage"), loginAdminUser);

router.route("/password/reset/:token").put(resetPassword);
//router.post('/admin/register', registerAdminUser);
router.route("/admin/register").post(registerAdminUser);


module.exports = router;
