const express = require('express');
const router = express.Router();
const multer = require('multer');
const { exec } = require('child_process');
const Resume = require('../models/resumeModel');

// Multer configuration for storing files with original names
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Keep the original filename
        cb(null, file.originalname);
    }
});
// Initialize Multer with custom storage
const upload = multer({ storage: storage });

router.post('/upload', upload.single('resume'), (req, res) => {
    try {
        const filePath = req.file.originalname;
        console.log('Uploaded file path:', filePath);
        const fileName = 'uploads/' + req.file.originalname;    

        exec(`python "D:/projects/CareerForge/src/utils/resumeParser.py" "${fileName}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                return res.status(500).json({ error: 'Error executing Python script' });
            } else if (stderr) {
                console.error('Python script error:', stderr);
                return res.status(500).json({ error: 'Python script error' });
            } else {
                console.log('Resume parsing completed:', stdout);
                return res.status(200).json({ message: 'Resume parsing completed', output: stdout });
            }
        });
    } catch (error) {
        console.error('Error parsing resume:', error);
        return res.status(500).json({ error: 'Error parsing resume' });
    }
});


router.post('/store', async (req, res) => {
    try {
        const Resume = require('../models/resumeModel');
        const sections = req.body;
        const contact = sections.contact;
        const education = sections.education;
        const projects = sections.projects;
        const skills = sections.skills;
        const experience = sections.experience;

        // const userID = req.user._id;

        const newResume = new Resume({

            contact,
            education,
            projects,
            skills,
            experience
        });

        await newResume.save();

        return res.status(201).json({ message: 'Resume data successfully stored in the database' });
    } catch (error) {
        console.error('Error storing resume data:', error);
        return res.status(500).json({ error: 'Error storing resume data' });
    }
});

router.get('/build', async (req, res) => {
    try{
        const resumeData = await Resume.findById(req.params.__id);
        res.setHeader('Content-Disposition', 'attachment; filename="resume.docx"');
        res.setHeader('Content-Type', 'application/msword');
        res.sendFile('path_to_generated_resume.docx');
    }
    catch(error){
        console.error('Error generating downloadable resume:', error);
        res.status(500).json({ error: 'Error generating downloadable resume' });
    }
});

// Export the router to be used in other files
module.exports = router;
