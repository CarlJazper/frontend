import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Confirmation dialog state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleConfirmSubmit = () => {
        setIsLoading(true);
        setProgress(10);

        // Proceed with the form submission after confirmation
        axios.post('http://localhost:5000/signup', formData)
            .then((response) => {
                setProgress(100);
                setTimeout(() => {
                    alert('User successfully registered!');
                    setFormData({ fname: '', lname: '', email: '', password: '' });
                    setError(null); 
                    navigate('/login');
                }, 500);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Sign up failed');
                setProgress(0); 
            })
            .finally(() => {
                setIsLoading(false);
                setShowConfirmDialog(false); // Close confirmation dialog
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmDialog(true); // Show confirmation dialog before submit
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    {isLoading && (
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                    )}
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p className="switch-auth">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>

           {/* Confirmation Modal */}
           {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>Signup with this information?</p>
                    <button onClick={handleConfirmSubmit}>Yes</button>
                    <button onClick={() => setShowConfirmDialog(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default Signup;
