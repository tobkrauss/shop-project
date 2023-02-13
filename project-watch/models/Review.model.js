const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  imgName: String,
  imgPath: String,
  publicId: String,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
