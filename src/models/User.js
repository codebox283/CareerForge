const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
