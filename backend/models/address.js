const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shipping_address:{
    name: {
      type: String,
      required: [true, "Please Enter Name"],
      trim: true,
    },
    
   
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
    locality: {
      type: String,
      
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
  }  
});

module.exports = mongoose.model("Address", addressSchema);
