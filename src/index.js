const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

const app = express();
//Upload Resume
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

// Middleware
app.use(session({
    secret: 'password', // Replace with a long, random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Allow cookies to be sent from frontend to backend
}));

// Connect to MongoDB
connectDB();


const name="Nakshatra.pdf";

// Routes
app.use('/api/users', userRoutes);
app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        const filePath = 'uploads/' + name;
        const backslashFilePath = filePath.replace(/\//g, '\\');
        console.log(backslashFilePath);
        exec(`python "D:/projects/CareerForge/src/utils/resumeParser.py" "${backslashFilePath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                res.status(500).json({ error: 'Error executing Python script' });
            } else if (stderr) {
                console.error('Python script error:', stderr);
                res.status(500).json({ error: 'Python script error' });
            } else {
                // Resume parsing completed successfully
                console.log('Resume parsing completed:', stdout);
                res.status(200).json({ message: 'Resume parsing completed', output: stdout });
            }
        });
    } catch (error) {
        console.error('Error parsing resume hjkadjh:', error);
        res.status(500).json({ error: 'Error parsing resume' });
    }
});


app.get('/', (req, res) => {
    res.send('Welcome to the Job Board API');
});

// Port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
