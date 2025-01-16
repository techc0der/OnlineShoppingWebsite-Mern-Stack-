const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensures this field is mandatory
        trim: true, // Removes extra spaces
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensures the price is non-negative
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Modern Sofa",
            "Dining Table",
            "Office Chair",
            "Wooden Bed",
            "Coffee Table",
            "Recliner Sofa",
            "Wardrobe",
            "Bookshelf",
            "Shoe Rack",
            "TV Stand"
        ], // Example categories
        trim: true,
    },
    img: {
        type: String,
        required: true, // Base64 string or image URL
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Ensures non-negative stock values
    },
    size: {
        type: String,
        required: false,
        trim: true, // Optional size field
    },
    user: {
        type: String,
        required: true, // Ensures that the product is linked to a user
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the Product model
module.exports = mongoose.model('Product', productSchema);

