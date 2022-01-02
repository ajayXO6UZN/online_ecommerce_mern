const express = require('express');
const { createProduct, 
    getProducts, 
    getProductsBySlug, 
    updateProduct, 
    addBulkProducts, 
    getProductDetailsById, 
    deleteProductById,
    createProductReview,
    getProductReviews,
    deleteReview,
    getFrontEndProducts
} = require('../controllers/product');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

var storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, file.originalname);
    }
});

const uploads2 = multer({ storage: storage2 });

const upload = multer({ storage });

router.post('/products',isAuthenticatedUser, createProduct);
router.post('/addBulkProduct', uploads2.single("csvBulkData"), addBulkProducts);
router.get('/admin/getAllProducts',isAuthenticatedUser, getProducts);

router.post('/updateProduct', updateProduct);
router.delete('/deleteProduct', deleteProductById);
router.get('/getAllProducts', getFrontEndProducts);
router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

//router.route("/review").put(isAuthenticatedUser, createProductReview);
router.put('/review', isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router