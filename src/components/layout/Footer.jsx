import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import './css/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;
            
            const isNearBottom = scrollTop + windowHeight >= fullHeight - 50;
            setIsVisible(isNearBottom);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`footer ${isVisible ? 'visible' : ''}`}>
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About</h3>
                    <p>Advanced log monitoring system for security.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: support@loganalysis.com</p>
                </div>
                <div className="footer-section">
                    <h3>Follow</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} Log Analysis. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
