import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaKey, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({ fname: '', lname: '', email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data on component load
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: token },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/change_password',
        { current_password: currentPassword, new_password: newPassword },
        { headers: { Authorization: token } }
      );
      setMessage(response.data.message);
      setIsError(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.response?.data.message || 'Error updating password');
      setIsError(true);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-details">
        <p>
          <FaUser className="profile-icon" /> <strong>First Name:</strong> {profile.fname}
        </p>
        <p>
          <FaUser className="profile-icon" /> <strong>Last Name:</strong> {profile.lname}
        </p>
        <p>
          <FaEnvelope className="profile-icon" /> <strong>Email:</strong> {profile.email}
        </p>
      </div>

      <form className="password-form" onSubmit={handlePasswordChange}>
        <h3>Change Password</h3>
        <div className="input-group">
          <FaKey className="input-icon" />
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaKey className="input-icon" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button className ="btn-upd" type="submit">Update Password</button>
      </form>
      {message && (
        <p className={`message ${isError ? 'error' : 'success'}`}>
          {isError ? <FaTimesCircle /> : <FaCheckCircle />} {message}
        </p>
      )}
    </div>
  );
};

export default Profile;
