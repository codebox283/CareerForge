// routes/resumeRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume } = require('../controllers/resumeController');
const { exec } = require('child_process');

// Multer middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint for uploading resumes
router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        // Execute Python script using child_process
        exec('python D:/projects/CareerForge/src/utils/resumeParser.py', (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                res.status(500).json({ error: 'Error executing Python script' });
            } else {
                // Resume parsing completed successfully
                console.log('Resume parsing completed:', stdout);
                res.status(200).json({ message: 'Resume parsing completed' });
            }
        });
    } catch (error) {
        console.error('Error uploading and parsing resume:', error);
        res.status(500).json({ error: 'Error uploading and parsing resume' });
    }
});

module.exports = router;
