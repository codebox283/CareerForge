import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', formData);
            console.log(response.data);
            // Redirect or perform other actions after successful login
        } catch (error) {
            console.error(error.response.data.message);
            // Handle error states
        }
    };

    return (
        <div id='login-form'>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
