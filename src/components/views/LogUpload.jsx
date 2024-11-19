import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa'; // React Icon for upload
import './css/logupload.css';

const LogUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [analysis, setAnalysis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [csvFilePath, setCsvFilePath] = useState('');
    const [filters, setFilters] = useState({ suspicious: '', severity: '', reason: '' });
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }
        setLoading(true);
    
        const formData = new FormData();
        formData.append('logfile', file);
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/upload_log', formData, {
                headers: { 'Authorization': token }
            });
            setMessage(response.data.message);
            setAnalysis(response.data.analysis);
            setCsvFilePath(response.data.csv_file_path);
            setShowModal(true);
        } catch (error) {
            setMessage('Failed to upload log');
        } finally {
            setLoading(false);
        }
    };
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredAnalysis = analysis.filter(event => {
        const { suspicious, severity, reason } = filters;
        return (
            (suspicious ? event.suspicious?.toLowerCase() === suspicious.toLowerCase() : true) &&
            (severity ? event.severity?.toLowerCase() === severity.toLowerCase() : true) &&
            (reason ? event.reason?.toLowerCase().includes(reason.toLowerCase()) : true)
        );
    });

    const closeModal = () => setShowModal(false);

    // Function to get severity color
    const getSeverityColor = (severity) => {
        switch(severity) {
            case 'Low': return '#d4edda'; // Green
            case 'Medium': return '#ffeeba'; // Yellow
            case 'High': return '#f8d7da'; // Red
            default: return '#e7f3fe'; // Default Blue
        }
    };

    return (
        <div className="log-upload-container">
            <div className="log-upload-section">
                <h2>Upload Log File</h2>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} required accept=".log,.txt" />
                    <button className="btn-upl" type="submit" disabled={loading}>
                        <FaUpload /> Upload
                    </button>
                </form>

                {/* Loading Spinner */}
                {loading && (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Analyzing...</p>
                    </div>
                )}

                {filteredAnalysis.length > 0 && (
                    <div className="analysis-results">
                        <div className="analysis-header">
                            <h3>Analysis Results:</h3>
                            {csvFilePath && (
                                <a href={csvFilePath} download>
                                    <button className="btn-dl">Download CSV</button>
                                </a>
                            )}
                        </div>
                        <ul>
                            {filteredAnalysis.map((event, index) => (
                                <li key={index} style={{ backgroundColor: getSeverityColor(event.severity) }}>
                                    <p>{event.timestamp} - {event.source} - {event.message}</p>
                                    <p><strong>Suspicious:</strong> {event.suspicious}</p>
                                    {event.reason && <p><strong>Reason:</strong> {event.reason}</p>}
                                    {event.severity && <p><strong>Severity:</strong> {event.severity}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <h3>Filter Results</h3>
                <label>Suspicious:</label>
                <select name="suspicious" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                <label>Severity:</label>
                <select name="severity" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label>Reason:</label>
                <input
                    type="text"
                    name="reason"
                    placeholder="Keyword"
                    onChange={handleFilterChange}
                />
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Upload Successful!</h3>
                        <p>Your log file was successfully uploaded.</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogUpload;
