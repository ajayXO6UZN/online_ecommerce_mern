const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    phone: {
      type: Number,
      required: [true, "Please Enter phone number"],
      maxLength: [10, "Phone number cannot exceed 10 characters"],
    },
    pincode: {
      type: Number,
      required: [true, "Please Enter pincode number"],
      maxLength: [10, "pincode number cannot exceed 10 characters"],
    },
    address: {
      type: String,
      required: [true, "Please Enter address"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Please Enter city/town/village"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "Please Enter state"],
      trim: true,
    },
    landmark: {
      type: String,
      required: [true, "Please Enter landmark"],
      trim: true,
    },
    alternatephone: {
      type: Number,
      maxLength: [10, "Phone number cannot exceed 10 characters"],
    },
  },
  orderItems: [
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: {
          type: String,
        },
        price:{
          type: Number,
        },
        quantity: { type: Number},
        //price: { type: Number, required: true }
        productPictures: [
          { img: { type: String } }
      ],
    }
],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  // itemsPrice: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // taxPrice: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // shippingPrice: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
   // required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
