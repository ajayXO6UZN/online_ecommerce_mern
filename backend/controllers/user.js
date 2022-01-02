const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
 
  // let userImage = [];

  // if (req.files.length > 0) {
  //   userImage = req.files.map((file) => {
  //     return { img: file.filename };
  //   });
  // }

  const { name, email, password, gender, phone, status, role, checked } = req.body;
 

  const user = await User.create({
    name,
    email,
    password,
    gender,
    phone,
    userImage,
    role,
    status
  });

  // SEND EMAIL TO THE USER
  if (checked !='false') {
    sendEmail(email);
  }

  // console.log(user)
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
 
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  const userStatus = ['Pending', 'Blocked'];

  if (userStatus.includes(user.status)) {
    return next(new ErrorHandler("You are blocked", 401));
  }

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

  // return next(new ErrorHandler("Please Enter Email & Password", 400));

  const users = await User.find({})

    .select("_id name email phone gender avatar role status")
    .exec();

  res.status(200).json({ users });
});


exports.updateUser = catchAsyncErrors(async (req, res, next) => {

  const { _id, name, email, phone, status, role, gender, change } = req.body;

  if (change == 'change') {
    let userImage = [];

    if (req.files && req.files.length > 0) {
      userImage = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const updateToNewUser = {
      _id, name, email, phone, userImage, status, role, gender
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      updateToNewUser,
      { new: true }
    );
    return res.status(201).json({ updatedUser });

  } else {

    const updateToNewUser = {
      _id, name, email, phone, status, role, gender
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      updateToNewUser,
      { new: true }
    );
    return res.status(201).json({ updatedUser });
  }
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});


exports.deleteUserById =async (req, res) => {
 
  const { userId } = req.body.payload;

  const user = await User.findById(userId);

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  //console.log(productId)
  if (userId) {
    User.deleteOne({ _id: userId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};



// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;


  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
