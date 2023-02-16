const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  products: Array,
  image: String,
  quantity: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
