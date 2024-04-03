const mongoose = require('mongoose');
require('dotenv').config();

const  dbUrl = "mongodb+srv://nakshatra:nBlh8wktqpsXla1N@cluster0.qprazk1.mongodb.net/candidate"

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
