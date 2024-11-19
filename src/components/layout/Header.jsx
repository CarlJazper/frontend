import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaChevronDown, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import './css/header.css';
import logo from './../../assets/logo.png';

const Header = ({ isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      {/* Centered Logo */}
      <div className="header-center">
        <Link to="/" className="header-logo">
          <img src={logo} alt="MyApp Logo" className="logo" />
        </Link>
      </div>

      <div className="header-right">
        {/* Conditionally render profile dropdown based on authentication */}
        {isAuthenticated && (
          <div className="dropdown-container">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <FaUserCircle className="user-icon" />
              <span className="profile-text">Profile</span>
              <FaChevronDown className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <FaUser className="dropdown-icon" /> Profile
                </Link>
                <button onClick={onLogout} className="dropdown-item">
                  <FaSignOutAlt className="dropdown-icon" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
