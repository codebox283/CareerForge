import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Img from '../assets/Img1.jpg';

const RegisterPage = () => {
    return (
        <div className='registerPage'>
            <div className='LeftDiv'>
                <img src={Img} alt=''></img>
            </div>
            <div className='RightDiv'>
                <div className="button-container">
                    <RegistrationForm/>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
