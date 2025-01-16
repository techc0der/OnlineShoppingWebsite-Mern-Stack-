const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.db_atlas);
const db = mongoose.connection;
db.on('connected',()=>console.log('db is connected'));
db.on('disconnected',()=>console.log('db is disconnected'));
db.on('error',()=>console.log('db is error'));
module.exports = db;