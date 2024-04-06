import React, { useState } from 'react';
import '../styles/NavBar.css'
import Img from '../assets/Img2.jpg';
import '../styles/NavBar.css';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='first'>
                <h2 className='logo'>CareerForge</h2>
            </div>
            <div className='second'>
                <ul className='menu'>
                    <li>About</li>
                    <li>Home</li>
                    <li>Resume Builder</li>
                </ul>
            </div>
            <div className='third'>
                <ul className='menu'>
                    <li>About</li>
                    <li>Home</li>
                    <li>Resume Builder</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
