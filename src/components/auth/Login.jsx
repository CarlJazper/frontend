import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './auth.css';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [progress, setProgress] = useState(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // State for confirmation modal
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
        axios.post('https://backend-tm1u.onrender.com/login', formData)
            .then((response) => {
                setProgress(100);
                setTimeout(() => {
                    alert('Login successful!');
                    localStorage.setItem('token', response.data.token);
                    onLogin();
                    navigate('/'); // Navigate to the home page after login
                }, 500);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Login failed');
                setProgress(0);
            })
            .finally(() => {
                setIsLoading(false);
                setShowConfirmDialog(false); // Close the confirmation dialog
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmDialog(true); // Show confirmation dialog when submit is clicked
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {isLoading && (
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                    )}
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p className="switch-auth">
                    Don't have an account? <Link to="/signup">Sign Up</Link> {/* Use Link for navigation */}
                </p>
            </div>

            {/* Confirmation Modal */}
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>Login with this account?</p>
                    <button onClick={handleConfirmSubmit}>Yes</button>
                    <button onClick={() => setShowConfirmDialog(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default Login;
