import React from 'react';
import '../styles/NavBar.css';

const NavBar = ({ username }) => {
    return (
        <div className='navbar'>
            <h2 className='logo'>CareerForge</h2>
            <ul className='elements'>
                <li>Home</li>
                <li>About</li>
                <li>{username ? `Welcome, ${username}` : 'Login'}</li>
            </ul>
        </div>
    );
};

export default NavBar;
