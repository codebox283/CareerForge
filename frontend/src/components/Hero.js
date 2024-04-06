import React, { useState } from 'react';
import '../styles/NavBar.css'
import Img from '../assets/Img2.jpg';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <div className='Hero'>
            <div className='HeadLine'>
                <div>
                <h1>Some Head Line Content</h1>
                <p>Some information about the site</p>
                </div>
            </div>
            <div className='HeroImg'>
                <img src={Img} alt=''></img>
            </div>
        </div>
    );
};

export default Hero;
