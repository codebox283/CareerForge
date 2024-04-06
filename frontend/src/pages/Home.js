import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Main from '../components/Main';

const Homepage = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/users/username');
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        fetchUsername();
    }, []);

    return (
        <div className='home'>
            <NavBar username={username} />
            <Hero />
            <Main />
            <Footer />
        </div>
    );
};

export default Homepage;
