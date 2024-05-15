const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const cors = require('cors');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const { exec } = require('child_process');
const path = require('path');
const jwt = require('jsonwebtoken');
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

// Middleware
app.use(session({
    secret: 'password', // Replace with a long, random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set secure to true if using HTTPS
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));


function verifyToken(req, res, next) {
  // Get token from request headers
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify token
  jwt.verify(token.replace('Bearer ', ''), 'password', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Add decoded user data to request object
    next();
  });
}


// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.get('/api/data/parsed_resume.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'parsed_resume.txt'));
});
app.use('/api', resumeRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Job Board API');
});
app.get('/api/store', (req, res) => {
    res.send('Storing resume endpoint');
});
app.get('/api/build', (req,res)=>{
    res.send("THis is where we build resume")
});
// Route for user authentication
app.post('/api/login', (req, res) => {
  // const user = { id: 1, username: 'exampleUser' };
  const token = jwt.sign(user, 'password', { expiresIn: '1h' });
  res.json({ token });
});
// Protected route to fetch username
app.get('/api/username', verifyToken, (req, res) => {
  const { username } = req.user; // Extract username from decoded token
  res.json({ username });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));