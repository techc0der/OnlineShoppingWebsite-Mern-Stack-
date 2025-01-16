const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const homePage = require('./Routes/home');
const user = require('./Routes/user');
const seller = require('./Routes/seller');
require('./db_connect');
const multer = require('multer');
const multerGridFSStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'], // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // If using cookies
}));

app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded payload size limit
app.use(express.json({ limit: '100mb' })); // Increase JSON payload size limit
app.use('/product', homePage);
app.use('/user', user);
app.use('/seller', seller);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
