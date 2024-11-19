import React, { useState, useEffect } from 'react';
import './css/settings.css';

const Settings = () => {
    // State for font size slider
    const [fontSize, setFontSize] = useState(16); // Default font size 16px

    // State for dark mode toggle (Checkbox)
    const [isDarkMode, setIsDarkMode] = useState(false);

    // State for font family selection (Radio buttons)
    const [fontFamily, setFontFamily] = useState('sans-serif'); // Default font family is sans-serif

    // Handle font size change
    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };

    // Handle dark mode toggle
    const handleDarkModeChange = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Handle font family change via radio buttons
    const handleFontFamilyChange = (e) => {
        setFontFamily(e.target.value);
    };

    // Apply dynamic styles based on user settings
    const containerStyles = {
        fontSize: `${fontSize}px`,
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        fontFamily: fontFamily, // Applying font family dynamically
    };

    return (
        <div className="settings-container" style={containerStyles}>
            <h2>Settings</h2>
            
            {/* Font Size Slider */}
            <div className="setting-item">
                <label htmlFor="fontSize">Font Size: {fontSize}px</label>
                <input 
                    id="fontSize" 
                    type="range" 
                    min="12" 
                    max="30" 
                    value={fontSize} 
                    onChange={handleFontSizeChange} 
                    className="slider"
                />
            </div>

            {/* Dark Mode Checkbox */}
            <div className="setting-item">
                <label htmlFor="darkMode">Enable Dark Mode</label>
                <input 
                    id="darkMode" 
                    type="checkbox" 
                    checked={isDarkMode} 
                    onChange={handleDarkModeChange} 
                />
            </div>

            {/* Font Family Radio Buttons */}
            <div className="setting-item">
                <label>Choose Font Family:</label>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            name="fontFamily" 
                            value="sans-serif" 
                            checked={fontFamily === 'sans-serif'} 
                            onChange={handleFontFamilyChange} 
                        />
                        Sans-serif
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="fontFamily" 
                            value="serif" 
                            checked={fontFamily === 'serif'} 
                            onChange={handleFontFamilyChange} 
                        />
                        Serif
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
