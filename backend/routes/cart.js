const express = require('express');
const { addToCart, getCartItems, newAddress, addOrUpdateAddress, removeCartItems } = require('../controllers/cart');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.post('/addtocart',isAuthenticatedUser,addToCart);
router.get('/getcartitems',isAuthenticatedUser,getCartItems);
router.post('/address',isAuthenticatedUser,newAddress);
router.post('/addorupdateuser',isAuthenticatedUser,addOrUpdateAddress);
router.post('/removecartitems',isAuthenticatedUser,removeCartItems);

module.exports = router;
