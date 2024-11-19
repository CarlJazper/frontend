import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import LogUpload from './components/views/LogUpload';
import LogList from './components/views/LogList';
import SecurityInsights from './components/views/SecurityInsights';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Header from './components/layout/Header';
import ConfirmationDialog from './components/layout/ConfirmDialog';
import Profile from './components/User/Profile';
import Settings from './components/views/Settings';  // Import Settings component
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
    const [isLoggingOut, setIsLoggingOut] = useState(false); // To handle loading state during logout
    const [showDialog, setShowDialog] = useState(false); // For managing dialog visibility

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Store login status in localStorage
    };

    const handleLogout = () => {
        setShowDialog(true); // Show the logout confirmation dialog
    };

    const confirmLogout = () => {
        setIsLoggingOut(true); // Start logout process
        setTimeout(() => {
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated'); // Remove login status from localStorage
            setIsLoggingOut(false); // Stop loading indicator
            setShowDialog(false); // Close the dialog
        }, 1000); // Simulating a delay for the logout process
    };

    const cancelLogout = () => {
        setShowDialog(false); // Close the dialog without logging out
    };

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []); // Only run on initial load

    return (
        <Router>
            {/* Render Header only once, passing authentication state */}
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            
            <Routes>
                {/* Default route to redirect to login or insights */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/insights" /> : <Navigate to="/login" />}/>

                {/* Public Routes */}
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/insights" /> : <Login onLogin={handleLogin} />}
                />

                <Route
                    path="/signup"
                    element={isAuthenticated ? <Navigate to="/insights" /> : <Signup />}
                />

                {/* Protected Routes (nested under DashboardLayout) */}
                <Route
                    element={isAuthenticated ? ( <DashboardLayout />) : (<Navigate to="/login" />)}
                >
                    <Route path="/upload" element={<LogUpload />} />
                    <Route path="/logs" element={<LogList />} />
                    <Route path="/insights" element={<SecurityInsights />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} /> {/* Added Settings route */}
                </Route>

                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/insights" : "/login"} />} />
            </Routes>

            {/* Loading indicator for logout */}
            {isLoggingOut && (
                <div className="logout-indicator">
                    <p>Logging out...</p>
                </div>
            )}

            {/* Show confirmation dialog if needed */}
            {showDialog && (
                <ConfirmationDialog 
                    message="Are you sure you want to log out?" 
                    onConfirm={confirmLogout} 
                    onCancel={cancelLogout} 
                />
            )}
        </Router>
    );
}

export default App;
