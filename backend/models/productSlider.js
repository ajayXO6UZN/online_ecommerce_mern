const mongoose = require("mongoose");

const productSliderSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Deal Tiltle"],
    trim: true,
  },
  type_of_deal: {
    type: String,
    required: [true, "Please Enter Type of deal"],
    trim: true,
  },
})

module.exports = mongoose.model("Product_deal", productSliderSchema);
