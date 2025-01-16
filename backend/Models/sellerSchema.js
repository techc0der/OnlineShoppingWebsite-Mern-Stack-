const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
require("../Models/productSchema");

const sellerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

});


sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    return next(error);
  }
});
sellerSchema.pre("insertMany", async function (docs) {
  try {
    // Loop through each document in the array and hash its password
    for (let i = 0; i < docs.length; i++) {
      const salt = await bcrypt.genSalt(10);
      docs[i].password = await bcrypt.hash(docs[i].password, salt);
    }
  } catch (error) {
    throw new Error(error); // Throw error if something goes wrong
  }
});


sellerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
