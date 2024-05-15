import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ResumeParser.css';

const ResumeParser = () => {
    const [resume, setResume] = useState(null);
    const [parsedText, setParsedText] = useState('');

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent the form from submitting

        const formData = new FormData();
        formData.append('resume', resume);

        try {
            const response = await axios.post('http://localhost:5500/api/resumes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchParsedText();
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    const fetchParsedText = async () => {
        try {
            const response = await axios.get('http://localhost:5500/api/data/parsed_resume.txt');
            setParsedText(response.data);
            
            parseResumeOutput(response.data);
            console.log("response.data");
        } catch (error) {
            console.error('Error fetching parsed text:', error);
        }
    };

    const parseResumeOutput = async (parsedText) => {
        const lines = parsedText.split('\n');
        // console.log(lines);
        const sections = {
            contact: [],
            education: [],
            projects: [],
            skills: [],
            experience: []
        };
        let currentSection = 'contact';
        let endKeywords = ['SKILLS', 'TECHNICAL SKILLS', 'CONTACT', 'EDUCATION', 'PROJECTS', 'KEY PROJECTS', 'QUALIFICATIONS', 'EXPERIENCE', 'WORK EXPERIENCE', 'ACHIEVEMENTS', 'PORs'];

        for (let line of lines) {
            if (line.startsWith('EDUCATION') || line.startsWith('QUALIFICATION')) {
                currentSection = 'education';
                sections[currentSection] = [];
                endKeywords = ['SKILLS', 'TECHNICAL SKILLS', 'CONTACT', 'PROJECTS', 'KEY PROJECTS', 'EXPERIENCE', 'WORK EXPERIENCE', 'ACHIEVEMENTS', 'PORs'];
            } else if (line.startsWith('PROJECTS') || line.startsWith('KEY PROJECTS')) {
                currentSection = 'projects';
                sections[currentSection] = [];
                endKeywords = ['EDUCATION', 'CONTACT', 'SKILLS', 'TECHNICAL SKILLS', 'EXPERIENCE', 'WORK EXPERIENCE', 'ACHIEVEMENTS', 'PORs'];
            } else if (line.startsWith('SKILLS') || line.startsWith('TECHNICAL SKILLS')) {
                currentSection = 'skills';
                sections[currentSection] = [];
                endKeywords = ['EDUCATION', 'CONTACT', 'PROJECTS', 'KEY PROJECTS', 'EXPERIENCE', 'WORK EXPERIENCE', 'ACHIEVEMENTS', 'PORs'];
            } else if (line.startsWith('EXPERIENCE') || line.startsWith('WORK EXPERIENCE')) {
                currentSection = 'experience';
                sections[currentSection] = [];
                endKeywords = ['SKILLS', 'TECHNICAL SKILLS', 'CONTACT', 'PROJECTS', 'KEY PROJECTS', 'EDUCATION', 'QUALIFICATIONS', 'ACHIEVEMENTS', 'PORs'];
            } else if (endKeywords.some(keyword => line.startsWith(keyword))) {
                currentSection = '';
            } else if (currentSection !== '' && line.trim() !== '') {
                sections[currentSection].push(line.trim());
            }
        }
        
        console.log('Filtered sections:', sections);
        try {
            await axios.post('http://localhost:5500/api/resumes/store', sections);
            console.log('Resume sections sent to the database successfully.');
        } catch (error) {
            console.error('Error sending resume sections to the database:', error);
        }
    };
        

    return (
        <div className='ResumeParser'>
            <div>
                <form onSubmit={handleUpload}>
                    <input type="file" name="resume" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
            {/* Display the output */}
            <div className='Output'>
                {(parsedText && 
                    <div>
                        <h2>Your Resume contents:</h2>
                        <pre className="Output-text">{parsedText}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeParser;
