const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: {
    type: String,
    required: true
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
},
{
  timestamps: true,
}
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
