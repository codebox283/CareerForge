import React, { useEffect } from 'react';
import '../styles/NavBar.css';

const NavBar = ({ username }) => {
    useEffect(() => {
        const handleMouseOver = (e) => {
            bounce(e.target);
        };

        const bounce = (letter) => {
            if (!letter.classList.contains("bounce")) {
                letter.classList.add("bounce");
                setTimeout(() => {
                    letter.classList.remove("bounce");
                }, 1000);
            }
        };

        document.querySelectorAll(".bouncing-letters>span").forEach((element) => {
            element.addEventListener("mouseover", handleMouseOver);
        });

        return () => {
            document.querySelectorAll(".bouncing-letters>span").forEach((element) => {
                element.removeEventListener("mouseover", handleMouseOver);
            });
        };
    }, []);

    return (
        <div className='navbar'>
            <h1 className="bouncing-letters">
                <span>C</span>
                <span>a</span>
                <span>r</span>
                <span>r</span>
                <span>e</span>
                <span>e</span>
                <span>r</span>
                <span>F</span>
                <span>o</span>
                <span>r</span>
                <span>g</span>
                <span>e</span>
            </h1>
            <ul className='elements'>
                <li>Home</li>
                <li>About</li>
                <li>{username ? `Welcome, ${username}` : 'Login'}</li>
            </ul>
        </div>
    );
};

export default NavBar;
