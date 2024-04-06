const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const multer = require('multer');
// const { parseResume } = require('./utils/resumeParser.py'); // Import resume parsing function
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const resumeDetails = await parseResume(filePath);
        res.json(resumeDetails);
    } catch (error) {
        console.error('Error parsing resume:', error);
        res.status(500).json({ error: 'Error parsing resume' });
    }
});


// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: 'password', // Replace with a long, random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Routes
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Job Board API');
});

// Port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
