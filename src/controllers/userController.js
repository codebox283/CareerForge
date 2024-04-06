// src/controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare plain text passwords (not recommended)
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Set session data if session middleware is properly configured
        req.session.userId = user._id;
        req.session.userEmail = user.email;
        req.session.username = user.username;

        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Controller function to fetch the username if the user is logged in
exports.getUsername = (req, res) => {
    try {
        const username = JSON.stringify(req.session.username) || 'Test';
        // console.log(username);
        return res.json({ username });
    } catch (error) {
        console.error('Error fetching username astafirullah:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};