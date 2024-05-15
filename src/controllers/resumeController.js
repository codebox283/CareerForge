const Resume = require('../models/resumeModel');
const User = require('../models/User');

const uploadResume = async (req, res) => {
    try {
        const username = req.session.username;

        if (!username) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { contact, education, skills, experience } = req.body;

        const savedResume = await Resume.create({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            education: education,
            skills: skills,
            experience: experience,
            createdAt: new Date(),
            username: username
        });

        res.status(201).json(savedResume);
    } catch (error) {
        console.error('Error uploading and parsing resume:', error);
        res.status(500).json({ error: 'Error uploading and parsing resume' });
    }
};

module.exports = {
    uploadResume
};
