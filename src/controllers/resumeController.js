const Resume = require('../models/resumeModel');
const User = require('../models/User');

// Controller function to handle uploading and parsing resumes
const uploadResume = async (req, res) => {
    try {
        // Extract username from session or request body (assuming it's already available in the session)
        const username = req.session.username;

        // Check if username exists
        if (!username) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Assuming req.file contains the uploaded resume file
        const resumeFilePath = req.file.path;
        
        // Call resume parsing logic here (assuming it's implemented in a separate utility function)
        const resumeData = await parseResume(resumeFilePath);
        
        // Save the parsed resume data to the database
        const savedResume = await Resume.create({ ...resumeData, username });
        
        res.status(201).json(savedResume);
    } catch (error) {
        console.error('Error uploading and parsing resume:', error);
        res.status(500).json({ error: 'Error uploading and parsing resume' });
    }
};

module.exports = {
    uploadResume
};
