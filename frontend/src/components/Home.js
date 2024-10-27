import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Main.module.css";
import earthSrc from "../earth.png";
import moonSrc from "../moon.png";
import shipSrc from "../ship.png";

const Wave = ({ reverse = 1 }) => {
    const [offset, setOffset] = useState(0);

    // const [circles, setCircles] = useState([]);

    const numOfCircles = 150;

    const circles = Array.from({ length: numOfCircles }).map((unused, index) => {
        const cx = (((index * index * 481289) % 10000000) / 10000000) * 100;
        const cy = (((index * index * 719359) % 10000000) / 10000000) * 120 - 10;
        const random = ((index * 182751) % 10000000) / 10000000;
        const r = random * 0.2 + 0.1;
        const opacity = random * 0.8 + 0.2;

        return (
            <circle
                key={index}
                cx={cx}
                cy={cy + offset * r * 3 * reverse}
                r={r}
                style={{ opacity }}
                fill="white"
                filter={"url(#blur)"}
            ></circle>
        );
    });

    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            setOffset(window.scrollY / 100);
        });
    }, []);

    return (
        <svg viewBox="0 8.6 100 100" preserveAspectRatio="none" id="svgArea">
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#202030", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#303045", stopOpacity: 1 }} />
                </linearGradient>
                <filter id="blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.1" />
                </filter>
                <clipPath id="clipPath1">
                    <path d="M0 10Q20 23 36 16T65 14 85 18 100 10V100H0Z" />
                </clipPath>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="-0.5" stdDeviation="0.5" floodColor="#3335" floodOpacity="0.8" />
                </filter>
            </defs>
            <path d="M0 10Q20 23 36 16T65 14 85 18 100 10V80H0Z" fill="url(#gradient1)" filter="url(#shadow)"></path>
            <g clipPath="url(#clipPath1)">{circles}</g>
        </svg>
    );
};

const FullWave = ({ flipped = false }) => {
    return (
        <div className={`${styles.coloredContainer} ${flipped ? styles.flipped : ""}`}>
            <div className={styles.coloredBG}></div>
            <div className={styles.waveContainer}>
                <Wave reverse={flipped ? -1 : 1} />
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div className={styles.wrapper}>
            <section>
                <div className={styles.split}>
                    <div>
                        <title style={{ color: "#333" }}>Launch Your HR Management into Orbit</title>
                        <p className="description">
                            <br />
                            Welcome to your all-in-one HR management tool designed to elevate your workforce. Effortlessly clock in and out
                            with facial recognition, manage payroll and PTO, and streamline employee schedules. With real-time analytics,
                            make informed decisions that propel your organization to new heights.
                        </p>
                        <div className={styles.smallMargin}>Margin</div>
                        <div className={styles.smallMargin}>Margin</div>
                        <Link to="/signup" className="outlined-button">
                            Get Started
                        </Link>
                    </div>
                    <div></div>
                </div>
                <div className={styles.earthContainer}>
                    <img className={styles.earth} src={earthSrc}></img>
                </div>
            </section>
            <section className={styles.featureContainer}>
                <FullWave />
                <div className={styles.waveMarginTop}>Margin</div>
                <title>Features</title>
                <div className={styles.cardContainer}>
                    <div>Facial Recognition Clocking In and Out</div>
                    <div>Comprehensive Payroll Management</div>
                    <div>Employee Self-Service Portal</div>
                </div>
                <Link to="/more" className="outlined-button">
                    Explore Features
                </Link>
                <div className={styles.smallMargin}>Margin</div>
            </section>
            <section>
                <div className={styles.split}>
                    <div></div>
                    <div>
                        <title style={{ color: "#333" }}>Affordable Solutions for Every Mission</title>
                        <p>
                            <br />
                            We offer a range of pricing plans designed to fit your needs and budget. From individual packages to
                            comprehensive solutions, our pricing is transparent and competitive. Choose the right plan to fuel your journey
                            and maximize your success.
                        </p>
                        <div className={styles.smallMargin}>Margin</div>
                        <div className={styles.smallMargin}>Margin</div>
                        <Link to="/pricing" className="outlined-button">
                            View Pricing
                        </Link>
                    </div>
                </div>
                <div className={styles.moonContainer}>
                    <img className={styles.moon} src={moonSrc}></img>
                </div>
            </section>
            <section className={styles.solutionContainer}>
                <FullWave flipped />
                <div className={styles.smallMargin}>Margin</div>

                <title>Solutions</title>
                <div className={styles.cardContainer}>
                    <div>Efficient Workforce Management</div>
                    <div>Cost Control and Budgeting</div>
                    <div>Enhanced Employee Experience</div>
                </div>
                <Link to="/more" className="outlined-button">
                    Explore Solutions
                </Link>
                <div className={styles.waveMarginTop}>Margin</div>
            </section>
            <section>
                <div className={styles.split}>
                    <div>
                        <title style={{ color: "#333" }}>Ready for Liftoff?</title>
                        <p>
                            <br />
                            Reach out to us to kickstart your next project and receive personalized guidance. Whether you need technical
                            support or a consultation, we're here to help. Let’s work together to reach new heights and achieve your goals.
                        </p>
                    </div>
                    <div className={styles.inputField}>
                        <input></input>
                        <input></input>
                        <input></input>
                    </div>
                </div>
                <Link to="/contact" className="outlined-button">
                    Contact us
                </Link>
                <div className={styles.shipContainer}>
                    <img className={styles.ship} src={shipSrc}></img>
                </div>
                <div className={styles.smallMargin}>Margin</div>
                <div className={styles.smallMargin}>Margin</div>
                <div className={styles.smallMargin}>Margin</div>
            </section>
        </div>
    );
};

export default Home;
