import React, { useState } from 'react';
import '../styles/NavBar.css'
import Img1 from '../assets/I1.jpg';
import Img2 from '../assets/I2.jpg';
import Img3 from '../assets/I3.jpg';
import '../styles/Main.css';
import { Link } from 'react-router-dom';
import ResumeParser from '../pages/ResumeParser';

const Main = () => {
    return (
        <div className='Main'>
            <div>
                <Link to='/resume-parser'>
                    <img src={Img1} alt='' />
                </Link>
            </div>
            <div>
                <Link to='/resume-parser'>
                    <img src={Img2} alt='' />
                </Link>
            </div>
            <div>
                <Link to='/resume-parser'>
                    <img src={Img3} alt='' />
                </Link>
            </div>
        </div>
    );
};

export default Main;
