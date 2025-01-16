const express = require('express');
const Router = express.Router();
const seller = require('../Models/sellerSchema');
const { GenerateToken, verifyToken1 } = require('../jwt');

Router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        const newSeller = new seller({ username, name, email, password });
        console.log(newSeller);
        const oldSeller = await seller.findOne({ username });
        if (oldSeller) {
            return res.status(400).json({ msg: "user is already register" })
        }
        const response = await newSeller.save();
        console.log(response);
        if (!response) {
            return res.status(400).json({ msg: "user is not save" })
        }
        res.status(200).json({ msg: "User is Register", response });
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

Router.post("/bulk-signup", async (req, res) => {
    try {
      const users = req.body; // Expecting an array of user objects
  
      // Validate that the input is an array and contains data
      if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ msg: "Input must be a non-empty array of users" });
      }
  
      // Check for duplicate usernames or emails in the array
      const usernames = users.map((user) => user.username);
      const emails = users.map((user) => user.email);
      const duplicateUsername = await seller.findOne({ username: { $in: usernames } });
      const duplicateEmail = await seller.findOne({ email: { $in: emails } });
  
      if (duplicateUsername) {
        return res.status(400).json({ msg: `Duplicate username found: ${duplicateUsername.username}` });
      }
      if (duplicateEmail) {
        return res.status(400).json({ msg: `Duplicate email found: ${duplicateEmail.email}` });
      }
  
      // Insert all users at once
      const response = await seller.insertMany(users);
      res.status(200).json({ msg: "Users registered successfully", users: response });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  });

Router.post('/', verifyToken1);

Router.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username);
        const user = await seller.findOne({ username:username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const response = await user.matchPassword(password);
        if (!response) {
            return res.status(400).json({ msg: "Invalid password" })
        }
        const userJwtData = {
            username,
            email
        }
        const token = await GenerateToken(userJwtData);
        console.log(token)
        res.status(200).json({ msg: "User is login", token: token }); 
    } catch (error) {
        res.status(500).json({ error: `Server side error ${error}` });
    }
})

module.exports = Router;
