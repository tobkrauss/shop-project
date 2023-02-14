// Defining schema with schema validations
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  caseMaterial: {
    type: String,
    required: true,
  },
  bandMaterial: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

// Defining model
const Watch = mongoose.model("Watch", watchSchema);
module.exports = Watch;
