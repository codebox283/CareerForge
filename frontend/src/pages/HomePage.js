import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import Img from '../assets/Img1.jpg';

const HomePage = () => {
    return (
        <div className='homepage'>
            <div className='LeftDiv'>
                <img src={Img} alt=''></img>
            </div>
            <div className='RightDiv'>
                <div className="button-container">
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                    <br></br>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
