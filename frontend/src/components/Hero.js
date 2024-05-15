import React from 'react';
import '../styles/NavBar.css'
import Img from '../assets/HeroImgAlt2.jpg';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <div className='Hero'>
            <div className='HeadLine'>
                <div>
                <h1>Resume Parsing and Builder</h1>
                <p>Streamline resume parsing for simpler info extraction</p>
                </div>
            </div>
            <div className='HeroImg'>
                <img src={Img} alt=''></img>
            </div>
        </div>
    );
};

export default Hero;
