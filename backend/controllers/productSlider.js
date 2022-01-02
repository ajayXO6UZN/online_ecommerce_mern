const Product_deal = require('../models/productSlider');
const Product = require('../models/product');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
var csv = require('csvtojson');

//Create Product Slider
exports.createProductSlider = catchAsyncErrors(async (req, res, next) => {
    // next(new ErrorHandler("Please Enter Email & Password", 400));
   // console.log(req.body);
   console.log('jjjjj slider')
   console.log(req.body)
    const { name, type_of_deal } = req.body;


    const productSlider = await Product_deal.create({
        name,
        type_of_deal
    });

    res.status(201).json({
        success: true,
        productSlider
    })
});

exports.getAllDeals = catchAsyncErrors(async (req, res, next) => {
console.log('ooooooooooooooooooooooooooooooooooooooooooooooo')
    const deals = await Product_deal.find({}).select('name type_of_deal');
console.log(deals)
    res.status(200).json(deals);
});


exports.getAllSlider = catchAsyncErrors(async (req, res, next) => {

    const deals = await Product_deal.find({});
    const data = [];
   
    for (var i = 0; i < deals.length; i++) {
        const anuj = await Product.find({ deal_type: deals[i]._id }).populate(
            "deal_type category",
            "name type_of_deal slug",
           
          );;
        const deal_name = deals[i].name;
        const deal_type = deals[i].type_of_deal;
        data.push({ deal_name,deal_type, pro: anuj })

    }
  //  console.log(data)


    res.status(200).json(data);
});
