// DashboardLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your Sidebar component

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <Outlet /> {/* This will render the child route's component */}
            </div>
        </div>
    );
};

export default DashboardLayout;
