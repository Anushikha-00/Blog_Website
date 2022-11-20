const mongoose = require('mongoose');

const connectDB = () =>{
    mongoose.connect(process.env.DATABASE,() =>{
        console.log('DATABASE CONNECTED.');
    })
}
module.exports = connectDB;