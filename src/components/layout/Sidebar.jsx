import React, { useState } from 'react';
import './css/sidebar.css';
import { FaBars, FaTimes, FaHome, FaUpload, FaList, FaCog } from 'react-icons/fa';  // Import settings icon
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Toggle Button */}
            <div className={`sidebar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Sidebar Container */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul className="sidebar-menu">
                    <li className="dashboard-item">
                        <Link to="/insights" onClick={toggleSidebar} className="sidebar-item">
                            <FaHome className="sidebar-icon" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/upload" onClick={toggleSidebar} className="sidebar-item">
                            <FaUpload className="sidebar-icon" /> Upload Logs
                        </Link>
                    </li>
                    <li>
                        <Link to="/logs" onClick={toggleSidebar} className="sidebar-item">
                            <FaList className="sidebar-icon" /> Logs History
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" onClick={toggleSidebar} className="sidebar-item">
                            <FaCog className="sidebar-icon" /> Settings {/* Link to Settings */}
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
