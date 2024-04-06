const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    education: [{
        institute: String,
        degree: String,
        fieldOfStudy: String,
        graduationYear: Number
    }],
    experience: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date
    }],
    skills: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
