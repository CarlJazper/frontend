import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/loglist.css';

const LogList = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(5); // Number of logs per page

    useEffect(() => {
        const fetchLogs = async () => {
          setLoading(true);
          const token = localStorage.getItem('token'); // Get token from localStorage or context
      
          try {
            const response = await axios.get('http://localhost:5000/logs', {
              params: { page, limit },
              headers: { Authorization: token },
              onDownloadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setProgress(percentage);
                }
              }
            });
      
            setLogs(response.data.logs);
            setTotalPages(response.data.pages);
            setProgress(100);
          } catch (error) {
            console.error('Error fetching logs:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchLogs();
      }, [page, limit]);
      
    // Pagination Handlers
    const handleFirstPage = () => setPage(1);
    const handleLastPage = () => setPage(totalPages);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="log-list-container">
            <h2>Uploaded Logs (Newest First)</h2>

            {loading && (
                <div className="progress-bar-container">
                    <p>Loading logs...</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}>{progress}%</div>
                    </div>
                </div>
            )}

            {!loading && logs.length > 0 ? (
                <>
                    <ul className="log-list">
                        {logs.map((log) => (
                            <li key={log.id}>
                                <h4>{log.filename} ({log.upload_date})</h4>
                                <pre>{log.log_data}</pre>
                            </li>
                        ))}
                    </ul>

                    <div className="pagination">
                        <button onClick={handleFirstPage} disabled={page === 1}>First</button>
                        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                        <span>Page {page} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
                        <button onClick={handleLastPage} disabled={page === totalPages}>Last</button>
                    </div>
                </>
            ) : (
                <p>{loading ? 'Please wait, logs are loading...' : 'No logs found.'}</p>
            )}
        </div>
    );
};

export default LogList;
