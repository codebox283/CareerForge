const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    // userID: { type: String, required: true },
    contact: [], 
    education: [],
    projects: [],
    skills: [],
    experience: [],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
