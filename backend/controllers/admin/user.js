const ErrorHandler = require("../../utils/errorhandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../models/user");
const sendToken = require("../../utils/jwtToken");
const sendEmail = require("../../utils/sendEmail");
const cloudinary = require("cloudinary");


// Register a User
exports.registerAdminUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password, gender, phone, status, role, checked } = req.body;

  if (req.body.avatar !== "undefined" && req.body.avatar !== '') {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      upload_preset: "avatars",
    });

    const user = await User.create({
      name,
      email,
      password,
      gender,
      phone,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      role,
      status
    });

    // SEND EMAIL TO THE USER
    if (checked != 'false') {
      sendEmail(email);
    }

    // console.log(user)
    sendToken(user, 201, res);

  } else {

    const user = await User.create({
      name,
      email,
      password,
      gender,
      phone,

      role,
      status
    });

    // SEND EMAIL TO THE USER
    if (checked != 'false') {
      sendEmail(email);
    }

    sendToken(user, 201, res);
  }
});

// Login User
exports.loginAdminUser = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const userStatus = ['Pending', 'Blocked'];

  if (userStatus.includes(user.status)) {
    return next(new ErrorHandler("You are blocked", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //console.log(user.role)
  if (isPasswordMatched) {
    if (user.role == 'admin' || user.role == 'editor' || user.role == 'author' || user.role == 'contributor') {
      sendToken(user, 200, res);
    } else {
      return next(new ErrorHandler("Only Admin access this resource", 401));
    }
  }

});


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

  // return next(new ErrorHandler("Please Enter Email & Password", 400));

  const users = await User.find({})

    .select("_id name email phone gender userImage role status")
    .exec();

  res.status(200).json({ users });
});


exports.updateUser = catchAsyncErrors(async (req, res, next) => {

  const { _id, name, email, phone, status, role, gender, change } = req.body;

  if (change == 'change') {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      upload_preset: "avatars",
    });

    const updateToNewUser = {
      _id, name, email, phone, status, role, gender,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      updateToNewUser,
      { new: true }
    );
    return res.status(201).json({success:true, updatedUser });

  } else {

    const updateToNewUser = {
      _id, name, email, phone, status, role, gender
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      updateToNewUser,
      { new: true }
    );
    return res.status(201).json({success:true, updatedUser });
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


exports.deleteUserById = async (req, res) => {

  const { userId } = req.body.payload;

  const user = await User.findById(userId);

  if (user.avatar.public_id !== undefined) {
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

  }

  if (userId) {
    User.deleteOne({ _id: userId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({success:true, result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

