import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Home';
import ResumeParser from './pages/ResumeParser';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {isLoggedIn ? (
                        <Route path="/home" element={<Homepage />} />
                    ) : (
                        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    )}
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/resume-parser" element={<ResumeParser />} />
                    <Route path="/resume-builder" element={<ResumeBuilder />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
