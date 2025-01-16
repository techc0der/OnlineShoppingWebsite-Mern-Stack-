const express = require('express');
const app = express();
const product = require('../Models/productSchema');
const seller = require('../Models/sellerSchema');
const Cart = require('../Models/cartSchema');
const { ObjectId } = require('mongodb');
const { verifyToken } = require('../jwt');
const Router = express.Router();


Router.post('/seller', verifyToken, async (req, res) => {
    const username = req.user.username;
    try {
        const response = await product.find({ user: username });
        console.log(response);
        if (!response) {
            res.status(400).json({ msg: "product is not fetch" })
        }
        else res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Server side error" })
    }
})

Router.delete('/seller/delete', verifyToken, async (req, res) => {
    const username = req.user.username;
    const { product_id } = req.query;
  
    if (!username) {
      console.error('Seller not found');
      return res.status(400).json({ msg: 'Seller not found' });
    }
  
    if (!product_id) {
      console.error('Product ID is missing');
      return res.status(400).json({ msg: 'Product ID is missing' });
    }
  
    try {
      //onst objectId = ObjectId(product_id);
      const response = await product.findByIdAndDelete(product_id);
  
      if (response.deletedCount === 0) {
        console.error(`Product with ID ${product_id} not found`);
        return res.status(404).json({ msg: 'Product not found' });
      }
      else{
        const response1 = Cart.fin
          console.log(`Product with ID ${product_id} deleted successfully`);
          res.status(200).json({ msg: 'Product deleted successfully'});
        }
    } catch (error) {
      console.error('Error during product deletion:', error);
      res.status(500).json({ error: error.message, msg: 'Server side error' });
    }
  });
  

Router.put('/seller', verifyToken, async (req, res) => {
    const username = req.user.username;
    if (!username) res.status(400).json({ msg: 'seller not found' })
    else {
        try {
            const seller = req.body;
            const sellerUpdate = {};
            if (seller.user) {
                sellerUpdate.user = seller.user;
            }
            if (seller.name) {
                sellerUpdate.user = seller.name;
            }
            if (seller.email) {
                sellerUpdate.user = seller.email;
            }
            if (seller.password) {
                sellerUpdate.user = seller.password;
            }
            const response = await product.updateOne(sellerUpdate);
            if (!response) {
                res.status(400).json({ msg: "product is not updated" })
            }
            else res.status(200).json(response);
        } catch (error) {

            res.status(500).json({ error: error, msg: 'server side error' });
        }
    }
})

Router.post('/search/seller', verifyToken, async (req, res) => {
    const { search } = req.query;
    const username = req.user.username;
    try {
        let products;
        if (search.length == 0) {
            products = await product.find({ user: username });
        }
        else {

            products = await product.find({ user: username, name: search });
        }
        if (products.length > 0) {
            res.status(200).json(products); // Send the matching products as a response
            console.log(products)
        }
        else {
            res.status(400).json({ msg: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

Router.post('/filter/seller', verifyToken, async (req, res) => {
    const { rating, price, category, search } = req.query;
    const username = req.user.username;
    try {
        const conditions = {};
        if (price) {
            conditions.price = {};
            conditions.price.$gte = 1; // Price >= minPrice
            if (price) conditions.price.$lte = parseFloat(price); // Price <= maxPrice
        }
        if (category) {
            conditions.category = category; // Match exact category
        }

        if (rating) {
            conditions.rating = rating; // Match exact category
        }
        if (search && search.length > 0) {
            conditions.name = search; // Match exact category
        }
        if (username) {
            conditions.user = username;
            const products = await product.find(conditions);

            res.status(200).json(products); // Send the matching products as a response
        }
        else {
            res.status(400).json({ msg: 'seller not found' });
        }
        // Fetch products from the database based on conditions

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching products for seller' });
    }
})


Router.post('/seller/addproduct', verifyToken, async (req, res) => {
    console.log('hii')
    const products = req.body;
    const results = [];
    const errors = [];
    try{
        const user = await seller.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ msg: 'Seller not found' });
        }
        console.log(products);
        if (Array.isArray(products)) {
            for (const prod of products) {
                try {
                    // Validate product data
                    if (!prod.name || !prod.price || !prod.category) {
                        errors.push({ prod, error: "Missing required fields" });
                        continue;
                    }

                    prod.user = req.user.username;
                    const newproduct = await product.create(prod);
                    results.push(newproduct);
                } catch (error) {
                    errors.push({ prod, error: error.message });
                }
            }

            return res.status(200).json({
                message: "Batch processing complete",
                success: results,
                failed: errors,
            });

        } else {
            // Handle single product case
            try {
                products.user = req.user.username;
                const newproduct = new product(products);
                console.log(products);
                const response = await newproduct.save();
                if (!response) {
                    return res.status(400).json({ msg: "Product is not saved" });
                } else {
                    return res.status(200).json({ msg: "Product is saved" });
                }
            } catch (error) {
                console.log('Request payload:');
                return res.status(500).json({ error: error.message });
            }
        }
    } catch (err) {
        console.error(err);

        return res.status(500).json({ error: "Internal Server Error" });
    }
});

Router.get('/cart', verifyToken, async (req, res) => {
    try {
        const user = req.user.username;
        const product_cart = await Cart.findOne({ user }); // Fetch the user's cart
        if (product_cart) {
            if (product_cart.products.length > 0) {
                const products_detail = [];

                // Loop through the products array to fetch details for each product
                for (const item of product_cart.products) {
                    //const getProduct = await product.findById(item.product_id); // Assuming `Product` is the model for your products
                        products_detail.push({
                            quantity: item.quantity,  
                            name: item.name,
                            price: item.price,
                            img:item.img,
                            product_id:item.product_id
                        });
                }
                // Respond with the product details
                res.status(200).json({
                    success: true,
                    products: products_detail,
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "No products in the cart.",
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "Cart not found for the user.",
            });
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});



Router.post('/addcart', verifyToken, async (req, res) => {
    const user = req.user.username;
    const { id,inc_dec,price,name,img} = req.body; // Expect both `id` and `quantity` from the request body
    
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user });
        console.log(cart);
        if (cart) {
            // Check if the product already exists in the cart
            const existingProduct = cart.products.find((item) => item.product_id === id);
            if (existingProduct) {
                // If the product exists, update its quantity
                if(inc_dec == +1){
                    existingProduct.quantity += 1;
                }
                else if(inc_dec == -1){
                    existingProduct.quantity -= 1;
                    if(existingProduct.quantity == 0){
                        cart.products = cart.products.filter((item) => item.product_id !== id);

                    }
                }
            } 
            else {
     
                // If the product doesn't exist, add it to the cart
                cart.products.push({ product_id: id,name:name,price:price,img:img});
            }
            // Save the updated cart
            await cart.save();
            res.status(200).json({ msg: 'Product is added/updated in the cart', cart });
        } else {
            // If no cart exists for the user, create a new cart
            console.log(id,' ',inc_dec, ' ',price,' ',name)
            const newCart = new Cart({
                user,
                products: [{ product_id:id,name:name,price:price,img:img}],
            });
            console.log(newCart);
            // Save the new cart
            await newCart.save();
            res.status(201).json({ msg: 'New cart created and product added', cart: newCart });
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ error: "Server side error" });
    }
});

Router.post('/removecart',verifyToken,async (req,res) => {
    const user = req.user.username;
    const { id} = req.body;
    try {
        const cart = await Cart.findOne({ user });
        if(cart){
            cart.products = cart.products.filter(item => item.product_id !== id);
            const response = await cart.save();
            if(!response){
                res.status(404).json({msg:'cart product is not remove'})
            }
            else{
                res.status(200).json({msg:'cart product is removed',response})
                console.log(response)
            } 
        }
        else{
            res.status(404).json({msg:'user not found in cart'})
        }
    } catch (error) {
        res.status(500).json({msg:'user not found in cart',error:error})
    }
})

Router.put('/seller/editproduct', verifyToken, async (req, res) => {

    try {
        const username = req.user.username;
        if (!username) res.status(400).json({ msg: 'seller not found' })
        else {
            try {
                const editproduct = req.body;
                const productUpdate = {};

                // Check for each field and add to the update object
                if (editproduct.name) {
                    productUpdate.name = editproduct.name;
                }
                if (editproduct.description) {
                    productUpdate.description = editproduct.description;
                }
                if (editproduct.size) {
                    productUpdate.size = editproduct.size;
                }
                if (editproduct.category) {
                    productUpdate.category = editproduct.category;
                }
                if (editproduct.img) {
                    productUpdate.img = editproduct.img;
                }
                if (editproduct.price) {
                    productUpdate.price = editproduct.price;
                }
                if (editproduct.stock) {
                    productUpdate.stock = editproduct.stock;
                }
                //console.log(productUpdate);
                // Use $set operator to update only the specified fields
                const response = await product.updateOne(
                    { _id:  editproduct.id},       // Filter condition
                    { $set: productUpdate }   // Fields to update
                );

                // Log the response to verify the operation
                //console.log(response);

                if (!response) {
                    res.status(400).json({ msg: "product is not updated" })
                }
                res.status(200).json({ msg: "product is updated" }); 
            } catch (error) {
                res.status(500).json({ error: error, msg: 'server side error' });
            }
        }
    } catch (err) {
        console.error(err);

        return res.status(500).json({ error: "Internal Server Error" });
    }
});

Router.get('/', async (req, res) => {
    try {
        const response = await product.find();
        if (!response) {

            res.status(400).json({ msg: "data is not fetch" })
        }
        else res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Server side error" })
    }
})


Router.post('/filter', async (req, res) => {
    const { rating, price, category, search } = req.query;
    try {
        const conditions = {};
        if (price > 0) {
            conditions.price = {};
            conditions.price.$gte = 1; // Price >= minPrice
            if (price) conditions.price.$lte = parseFloat(price); // Price <= maxPrice
        }
        if (category) {
            conditions.category = category; // Match exact category
        }

        if (rating) {
            conditions.rating = {}; // Match exact category
            conditions.rating.$gte = 0;
            if (rating) conditions.rating.$lte = parseFloat(rating);
        }
        if (search && search.length > 0) {
            conditions.name = search; // Match exact category
        }
        // Fetch products from the database based on conditions
        console.log(conditions);
        const products = await product.find(conditions);

        res.status(200).json(products); // Send the matching products as a response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
})




module.exports = Router;
