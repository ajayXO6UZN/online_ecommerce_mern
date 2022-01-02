const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Cart = require("../models/cart");
const Address = require("../models/address");



exports.addToCart = catchAsyncErrors(async (req, res, next) => {

    const userExsist = await Cart.findOne({ user: req.user._id });

    if (userExsist) {

        const sameProduct = await Cart.findOne({ "cartItems.product": req.body.cartItems.product });



        if (sameProduct) {

            await Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": req.body.cartItems.product },
                {
                    $set: {
                        "cartItems.$": req.body.cartItems,
                    },
                }
                , { upsert: true })

            res.status(200).json(req.body.cartItems.quantity);
        } else {
            await Cart.findOneAndUpdate({ user: req.user._id },
                {
                    $push: {
                        "cartItems": req.body.cartItems,
                    },
                }
                , { upsert: true })

            res.status(200).json("sameProduct");
        }

    } else {

        //if cart not exist then create a new cart
        const cartItemData = await Cart.create({
            user: req.user._id,
            cartItems: req.body.cartItems,
        });

        res.status(200).json(cartItemData);
    }



})

exports.getCartItems = catchAsyncErrors(async (req, res, next) => {

    const getCarts = await Cart.find({ user: req.user._id }).populate(
        "cartItems.product"
    );

    const items = await Cart.find({ user: req.user._id }).populate(
        "cartItems.product"
    );
    var tempData = [];
    const data = items[0].cartItems;
    for (var i = 0; i < data.length; i++) {

        tempData.push({

            product: data[i].product._id,
            name: data[i].product.name,
            price: data[i].product.price,
            quantity: data[i].quantity,
            productPictures: data[i].product.productPictures,
        });
    }
    const cartWithoutPopulate = await Cart.find({ user: req.user._id });
    const address_ = await Address.find({ user: req.user._id });

    var address
    if (address_.length == 0) {
        address = '';
    } else {
        address = address_[0].shipping_address
    }




    res.status(200).json({
        success: true,
        orderItems: tempData,
        getCarts,
        cartWithoutPopulate,
        address: address == '' ? '' : address,
        numofcart: getCarts[0].cartItems.length
    });
})

// Create new Order
exports.newAddress = catchAsyncErrors(async (req, res, next) => {


    const address = await Address.create(
        {
            user: req.user._id,
            shipping_address: req.body
        },
    );

    res.status(201).json({
        success: true,
        address
    });
});


exports.addOrUpdateAddress = catchAsyncErrors(async (req, res, next) => {

    const userExsist = await Address.findOne({ user: req.user._id });

    if (userExsist) {

        await Address.findOneAndUpdate({ user: req.user._id },
            {
                $set: {
                    "shipping_address": req.body.shipping_address,
                },
            }
            , { upsert: false })
        const shippingAddress = req.body.shipping_address;
        res.status(200).json({ success: true, shippingAddress });


    } else {
        //if cart not exist then create a new cart
        const cartItemData = await Address.create({
            user: req.user._id,
            shipping_address: req.body.shipping_address,
        });

        res.status(200).json({ success: true, cartItemData });
    }



})


// new update remove cart items
exports.removeCartItems = (req, res) => {
    const productId = req.body.payload;

    if (productId) {
        Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                $pull: {
                    cartItems: {
                        product: productId,
                    },
                },
            }
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    }
};