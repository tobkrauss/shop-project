const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
      },
      imgName: String,
      imgPath: String,
      publicId: String
  },
);

const Review = model("Review", reviewSchema);
module.exports = Review;
