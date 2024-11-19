import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { FaShieldAlt, FaChartPie, FaExclamationTriangle } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './css/securityinsights.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const SecurityInsightsDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [analysisData, setAnalysisData] = useState([]);
  const [suspiciousAnalysisData, setSuspiciousAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(30);
  const [activeTab, setActiveTab] = useState('charts');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const [logsResponse, analysisResponse, suspiciousAnalysisResponse] = await Promise.all([
          fetch('https://backend-tm1u.onrender.com/logs?page=1&limit=5', {
            headers: { Authorization: token }
          }),
          fetch('https://backend-tm1u.onrender.com/analysis_results', {
            headers: { Authorization: token }
          }),
          fetch('https://backend-tm1u.onrender.com/suspicious_analysis_results', {
            headers: { Authorization: token }
          })
        ]);

        const logsData = await logsResponse.json();
        const analysisData = await analysisResponse.json();
        const suspiciousAnalysisData = await suspiciousAnalysisResponse.json();

        setLogs(logsData.logs || []);
        setTotalLogs(logsData.total || 0);
        setAnalysisData(analysisData);
        setSuspiciousAnalysisData(suspiciousAnalysisData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const eventCounts = {};
  suspiciousAnalysisData.forEach(alert => {
    if (alert.reason) {
      eventCounts[alert.reason] = (eventCounts[alert.reason] || 0) + 1;
    }
  });

  const topEvents = Object.entries(eventCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const pieChartData = {
    labels: topEvents.map(event => event[0]),
    datasets: [{ data: topEvents.map(event => event[1]), backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] }],
  };

  const severityLevels = ['High', 'Medium', 'Low'];
  const timestamps = [...new Set(analysisData.map(alert => alert.timestamp))].sort();
  const filteredTimestamps = timestamps.filter(timestamp => {
    const alertDate = new Date(timestamp);
    const currentDate = new Date();
    return (currentDate - alertDate) / (1000 * 3600 * 24) <= sliderValue;
  });

  const lineChartData = {
    labels: filteredTimestamps,
    datasets: severityLevels.map((level, index) => ({
      label: `${level} Severity`,
      data: filteredTimestamps.map(timestamp => analysisData.filter(alert => alert.timestamp === timestamp && alert.severity === level).length),
      borderColor: ['#e74c3c', '#f39c12', '#2ecc71'][index],
      fill: false,
      tension: 0.4,
    })),
  };

  const filteredAlerts = suspiciousAnalysisData.filter(alert => alert.severity !== 'Low');

  return (
    <div className="security-insights-dashboard">
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating data...</p>
        </div>
      ) : (
        <>
          <div className="metrics">
            <div className="card">
              <FaShieldAlt size={24} color="#3498db" />
              <span>Total Logs Checked: {totalLogs}</span>
            </div>
            <div className="card suspicious-card">
              <FaExclamationTriangle size={24} color="#e74c3c" />
              <span>Total Suspicious Activities: {filteredAlerts.length}</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tabs">
            <button className={activeTab === 'charts' ? 'tab active' : 'tab'} onClick={() => setActiveTab('charts')}>
              <FaChartPie size={16} /> Charts
            </button>
            <button className={activeTab === 'alerts' ? 'tab active' : 'tab'} onClick={() => setActiveTab('alerts')}>
              <FaExclamationTriangle size={16} /> Recent Alerts
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'charts' && (
            <div className="charts">
              <div className="chart pie-chart">
                <h3>Incident Types</h3>
                <div className="chart-container">
                  <Pie data={pieChartData} />
                  {topEvents.length === 0 && <p className="no-data">No data to analyze, please upload logs.</p>}
                </div>
              </div>

              <div className="chart line-chart">
                <h3>Alerts Over Time</h3>
                <div className="slider-container">
                  <label htmlFor="slider">Last {sliderValue} days</label>
                  <input id="slider" type="range" min="1" max="30" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} />
                </div>
                <div className="chart-container">
                  <Line data={lineChartData} />
                  {filteredTimestamps.length === 0 && <p className="no-data">No data to analyze, please upload logs.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="recent-alerts">
              <h3>Recent Alerts</h3>
              {filteredAlerts.slice(0, 6).map((alert, index) => (
                <div key={index} className="alert-item">
                  <p><strong>Severity:</strong> {alert.severity}</p>
                  <p><strong>Reason:</strong> {alert.reason}</p>
                  <p><strong>Timestamp:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                </div>
              ))}
              {filteredAlerts.length === 0 && <p className="no-data">No suspicious activities detected.</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SecurityInsightsDashboard;
