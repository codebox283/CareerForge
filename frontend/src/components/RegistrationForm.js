import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegistrationForm.css'

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [registrationError, setRegistrationError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5500/api/users/register', formData);
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // User already exists, update state to display error message
                setRegistrationError('User already exists. Please try a different email.');
            } else {
                // Other error occurred, log and handle accordingly
                console.error(error);
            }
        }
    };

    return (
        <div id='registration-form'>
            <h2>Registration Form</h2>
            {registrationError && <div className="error-message">{registrationError}</div>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
