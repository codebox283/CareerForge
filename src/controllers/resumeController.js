// controllers/resumeController.js

const Resume = require('../models/resumeModel');

// Controller function to handle uploading and parsing resumes
const uploadResume = async (req, res) => {
    try {
        // Assuming req.file contains the uploaded resume file
        const resumeFilePath = req.file.path;
        
        // Call resume parsing logic here (assuming it's implemented in a separate utility function)
        const resumeData = await parseResume(resumeFilePath);
        
        // Save the parsed resume data to the database
        const savedResume = await Resume.create(resumeData);
        
        res.status(201).json(savedResume);
    } catch (error) {
        console.error('Error uploading and parsing resume:', error);
        res.status(500).json({ error: 'Error uploading and parsing resume' });
    }
};

module.exports = {
    uploadResume
};
