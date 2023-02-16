const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: Array,
  image: String,
  quantity: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
