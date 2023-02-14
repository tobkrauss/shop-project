const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        products: Array,
        price: Number,
        image: String,
        quantity: Number
    }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
