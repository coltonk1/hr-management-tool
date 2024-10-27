import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";
import NotFound from "../NotFound";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <div className={styles.dashboard_container}>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Dashboard;
