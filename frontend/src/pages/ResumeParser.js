import React, { useState } from 'react';
import axios from 'axios';

const ResumeParser = () => {
    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('resume', resume);
        
        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Handle the response, display extracted details, etc.
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    return (
        <div className='ResumeParser'>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Resume</button>
        </div>
    );
};

export default ResumeParser;
