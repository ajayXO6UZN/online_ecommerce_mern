const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
      },
    categoryImage: { type: String },
    parentId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'categories', 
    },
}, { timestamps: true });

CategorySchema.index({name: 'text'});

module.exports = mongoose.model('categories', CategorySchema);