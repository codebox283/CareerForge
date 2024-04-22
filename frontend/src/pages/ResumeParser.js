import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ResumeParser.css';

const ResumeParser = () => {
    const [resume, setResume] = useState(null);
    const [output, setOutput] = useState('');

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent the form from submitting

        const formData = new FormData();
        formData.append('resume', resume);

        try {
            const response = await axios.post('http://localhost:5500/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Update the state with the Python script output
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error uploading resume ahdslfljas:', error);
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
                {output && (
                    <div>
                        <h2>Your Resume contents:</h2>
                        <pre>{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeParser;
