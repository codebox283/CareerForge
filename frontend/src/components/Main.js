import React from 'react';
import '../styles/NavBar.css'
// import Img2 from '../assets/2.png';
import Img3 from '../assets/3.png';
import Img1 from '../assets/1.png';
import '../styles/Main.css';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className='Main'>
            {/* <div>
                <Link to='/resume-parser'>
                    <img src={Img2} alt='' />
                </Link>
            </div> */}
            <div>
                <Link to='/resume-parser'>
                    <img src={Img1} alt='' />
                </Link>
            </div>
            <div>
                <Link to='/resume-builder'>
                    <img src={Img3} alt='' />
                </Link>
            </div>
        </div>
    );
};

export default Main;
