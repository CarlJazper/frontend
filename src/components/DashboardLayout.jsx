// components/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Breadcrumbs from './layout/Breadcrumbs';
import Footer from './layout/Footer';

const DashboardLayout = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-body">
                <Sidebar />
                <div className="main-content">
                    {/* Add Breadcrumbs here */}
                    <Breadcrumbs />
                    <Outlet />
                </div>
                {/* <Footer/> */}
            </div>
        </div>
    );
};

export default DashboardLayout;
