import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
