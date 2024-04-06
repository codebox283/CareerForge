import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loggedIn, setLoggedIn] = useState(false); // State to track login status
    const [error, setError] = useState(null); // State to store error message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5500/api/users/login', formData);
            console.log(response.data);
            
            if (response.data.success) {
                // User login successful, update loggedIn state
                setLoggedIn(true);
            } else {
                // User not found or invalid credentials
                setError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div id='login-form'>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}
                <button type="submit">Login</button>
            </form>
            {loggedIn && <p>You are logged in. <Link to="/home">Go to Home</Link></p>}
        </div>
    );
};

export default LoginForm;
