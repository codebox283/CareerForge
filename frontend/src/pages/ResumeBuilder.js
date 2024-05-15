import React from 'react';
import axios from 'axios';


const ResumeBuilder = () => {
    
    const handleDownload = async () => {
        try {
            // Make an HTTP request to the backend endpoint to trigger resume download
            const response = await axios.get('http://localhost:5500/api/resumes/build', {
                responseType: 'blob' // Set responseType to 'blob' to receive binary data
            });
    
            // Create a temporary URL for the downloadable resume
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            // Trigger download using an anchor element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.docx');
            document.body.appendChild(link);
            link.click();
    
            // Clean up
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    };
    
    return(
        <div>
            <h1>Resume Builder</h1>
            <button onClick={handleDownload}>Download Resume</button>
        </div>
    );
};

export default ResumeBuilder;