import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";
import settings_icon from "../../resources/settings_icon.svg";
import attendance_icon from "../../resources/attendance_icon.svg";
import payments_icon from "../../resources/payments_icon.svg";
import summary_icon from "../../resources/summary_icon.svg";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div>
                <div>
                    <img></img>
                    <p>Business Name</p>
                </div>
            </div>
            <nav id="nav">
                <li className={styles.li}>
                    <img className={styles.icon} src={summary_icon}></img>
                    <Link className={styles.li} to="/dashboard/summary">
                        Summary
                    </Link>
                </li>
                <li className={styles.li}>
                    <img className={styles.icon} src={attendance_icon}></img>
                    <Link className={styles.li} to="/dashboard/attendance">
                        Attendance
                    </Link>
                </li>
                <li className={styles.li}>
                    <img className={styles.icon} src={payments_icon}></img>
                    <Link className={styles.li} to="/dashboard/payments">
                        Payments
                    </Link>
                </li>
                <li className={styles.li}>
                    <img className={styles.icon} src={settings_icon}></img>
                    <Link className={styles.li} to="/dashboard/settings">
                        Settings
                    </Link>
                </li>
            </nav>
        </div>
    );
};

export default Sidebar;
