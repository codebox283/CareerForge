import React from 'react';
import LoginForm from '../components/LoginForm';
import Img from '../assets/Img1.jpg';

const LoginPage = () => {
    return (
        <div className='loginPage'>
            <div className='LeftDiv'>
                <img src={Img} alt=''></img>
            </div>
            <div className='RightDiv'>
                <div className="button-container">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
