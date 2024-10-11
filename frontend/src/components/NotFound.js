import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Main.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>404 - Page Not Found</h1>
            <p className={styles.message}>Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className={styles.link}>
                Go back to the homepage
            </Link>
        </div>
    );
};

export default NotFound;
