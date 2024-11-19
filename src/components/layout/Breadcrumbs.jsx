// components/layout/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/breadcrumbs.css';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav aria-label="breadcrumb" className="breadcrumb-container">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <li key={to} className="breadcrumb-item active" aria-current="page">
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </li>
                    ) : (
                        <li key={to} className="breadcrumb-item">
                            <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
