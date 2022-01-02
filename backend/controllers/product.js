const Product = require('../models/product');
const Category = require('../models/category');
const csvModel = require('../models/csv');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
var csv = require('csvtojson');
const shortid = require("shortid");
const slugify = require("slugify");
const ApiFeatures = require('../utils/apifeatures');
const { authorizeRoles } = require('../middleware/auth');
const cloudinary = require("cloudinary");

//Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // next(new ErrorHandler("Please Enter Email & Password", 400));
  console.log('req.body')
  console.log(req.body.deal_type)
  // console.log(req.body.images)
  const { name, price, comparePrice, brand, description, category, Stock, deal_type, createdBy } = req.body;
  const user = req.user._id;
  let images = [];

  var status;

 

  if (req.user.role === 'contributor') {
    status = 'Pending'
  }
  // CLOUDINARY ARRAY IMAGEES
  if (req.body.images !== undefined && req.body.images !== '') {
    console.log('looooooooooooooooooooooooooooooooo')
    //  console.log(req.body.images)
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    console.log(imagesLinks)
    images = imagesLinks;
  }
  console.log(images)
  // CLOUDINARY IMAGES END

  const product = await Product.create({
    name,
    slug: slugify(name),
    price,
    comparePrice,
    brand,
    description,
    category,
    Stock,
    createdBy,
    images,
    deal_type:deal_type == '' ? null : deal_type,
    user,
    status
  });

  res.status(201).json({
    success: true,
    product
  })
});


exports.getProducts = catchAsyncErrors(async (req, res, next) => {

  // return next(new ErrorHandler("Please Enter Email & Password", 400));
  const roles = ['admin', 'editor', 'contributor']
  console.log('hello' + req.user.role)
  if (roles.includes(req.user.role)) {
    const products = await Product.aggregate([
      {
        $addFields: {
          sortId: {
            $cond: [
              {
                $eq: [
                  "$status",
                  "Pending"
                ]
              },
              0,
              {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Active"
                    ]
                  },
                  1,
                  2
                ]
              }
            ]
          }
        }
      },
      {
        $sort: {
          sortId: 1
        }
      }
    ]);

    console.log(products)
    res.status(200).json({ products });
  } else if (req.user.role == 'author') {
    const products = await Product.find({ user: req.user._id }).exec();
    console.log(products)
    res.status(200).json({ products });
  }

});

exports.getFrontEndProducts = catchAsyncErrors(async (req, res, next) => {
console.log(req.query)
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  console.log(req.query);
  const apiFeature = new ApiFeatures(Product.find().limit(6), req.query)
    .search()
    .filter()
   
 const searchAllProducts = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
   // .pagination(resultPerPage);

  let products = await apiFeature.query;
  let productsMain = await searchAllProducts.query;

  let filteredProductsCount = products.length;
  

  res.status(200).json({
    success: true,
    productsMain,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Filter product according to category

exports.getMobilesProducts = catchAsyncErrors(async (req, res, next) => {

  // return next(new ErrorHandler("Please Enter Email & Password", 400));

  const products = await Product.find({ catetory: "" })

    .select("_id name brand price comparePrice Stock description productPictures category status")
    .exec();

  res.status(200).json({ products });
});


exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  console.log('please ___ ____ ____ __ ___ ____ _____')
  // next(new ErrorHandler("Product not found", 404));
  console.log(req.body.deal_type)
  //console.log('req.files cxcxcxc')
  const { _id, name, price, comparePrice, brand, description, category, deal_type, Stock, status } = req.body;

  let product = await Product.findById(_id);

  if (req.body.images !== undefined && req.body.images !== '') {
    console.log(req.body.images)
    console.log('ffffffffffffffffffffffffffffffffff')
    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      images = imagesLinks;
      const updateToNewProduct = {
        name, price, comparePrice, brand, description, category, Stock, status, images, deal_type
      }
      console.log(updateToNewProduct)
      const updatedCategory = await Product.findOneAndUpdate(
        { _id: _id },
        updateToNewProduct,
        { new: true }
      );
      return res.status(200).json({ success: true, updatedCategory });
    }

  } else {

    const updateToNewProduct = {
      name, price, comparePrice, brand, description, category, Stock, status, deal_type
    }
    console.log(updateToNewProduct)
    const updatedCategory = await Product.findOneAndUpdate(
      { _id: _id },
      updateToNewProduct,
      { new: true }
    );
    return res.status(200).json({ success: true, updatedCategory });
  }
});

// Delete Product

// new update
exports.deleteProductById = async (req, res, next) => {
  // console.log('asdsfzccx')
  const { productId } = req.body.payload;

  const product = await Product.findById(productId);


  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  //console.log(productId)
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ success: true });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.addBulkProducts = (req, res, next) => {
  // console.log(req.file.path)
  //  console.log('afsgdgadhagdfsgdfasdgfsaggggggggggggggggg')
  //convert csvfile to jsonArray   
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      console.log(jsonObj);
      Product.insertMany(jsonObj, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // res.redirect('/');
        }
      });
    });
}

exports.getProductsBySlug = async (req, res) => {

  console.log(req.params);
  const { slug } = req.params;

  const category = await Category.findOne({ slug: slug });


  if (category) {
    // const products =await Product.find({ category: category._id,price: { $gte: 16000,$lte: 30000 },ratings: { $gte:3 },brand: ['brand_pp','brand_dd'] });
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  

    const brandData = await Product.find({ category: category._id }).distinct('brand')
  

    req.query.category = category._id

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;

    if (category.type) {
      if (products.length > 0) {
        res.status(200).json({
          success: true,
          brandData,
          products,
          priceRange: {
            under5k: 5000,
            under10k: 10000,
            under15k: 15000,
            under20k: 20000,
            under30k: 30000,
          },
          productsByPrice: {
            under5k: products.filter((product) => product.price <= 5000),
            under10k: products.filter(
              (product) => product.price > 5000 && product.price <= 10000
            ),
            under15k: products.filter(
              (product) => product.price > 10000 && product.price <= 15000
            ),
            under20k: products.filter(
              (product) => product.price > 15000 && product.price <= 20000
            ),
            under30k: products.filter(
              (product) => product.price > 20000 && product.price <= 30000
            ),
          },
          productsCount,
          resultPerPage,
          filteredProductsCount,
        });
      }
    } else {
      res.status(200).json({ products });
    }
  }
};


exports.getProductDetailsById = async (req, res) => {
  const { productId } = req.params;
  if (productId) {

    const product = await Product.findOne({ _id: productId });
    const categoryData = await Category.findOne({ name: product.category })
    res.status(200).json({ product, categoryData });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};


// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  console.log('hello review')
  console.log(req.body)
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
