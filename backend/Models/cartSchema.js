const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      product_id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: false, // Base64 string or image URL
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
        min: 1, // Ensure quantity is at least 1
      },
    },
  ],
});


const Cart = mongoose.model('cartproduct', cartSchema);

module.exports = Cart;