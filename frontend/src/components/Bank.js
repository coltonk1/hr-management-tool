import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";
import bank_styles from "../styles/Bank.module.css";

import star_src from "../shooting_stars.png";

const BalanceGraph = ({ amounts, color }) => {
    useEffect(() => {
        const id = "balance-graph";
        const canvas = document.getElementById(id);

        if (!canvas) return; // Ensure canvas exists before proceeding
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions
        canvas.width = 1000;
        canvas.height = 300;

        ctx.fillStyle = "#252530";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate max and min values in amounts
        let max = 0;
        let min = amounts[0];
        for (let i = 0; i < amounts.length; i++) {
            max = Math.max(amounts[i], max);
            min = Math.min(amounts[i], min);
        }

        const numRows = amounts.length;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const rowSpacing = canvasHeight / (numRows + 1) - 15;
        const smoothness = 3;

        // Gradient for filling the area under the line
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `${color}a0`);
        gradient.addColorStop(1, `${color}00`);

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(0, canvas.height - ((amounts[0] - min) * canvas.height) / (max - min));

        for (let i = 0; i < amounts.length; i++) {
            let y = canvas.height - ((amounts[i] - min) * canvas.height) / (max - min);
            let x = (canvasWidth / (amounts.length - 1)) * i;

            if (i > 0) {
                let cp1x = prevX + (x - prevX) / smoothness;
                let cp1y = prevY;
                let cp2x = x - (x - prevX) / smoothness;
                let cp2y = y;

                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            }

            // Save the current point as the previous for the next iteration
            var prevX = x;
            var prevY = y;
        }

        // Close the path and fill with gradient
        ctx.lineTo(prevX, canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Redraw the lines and circles on top
        for (let i = 0; i < amounts.length; i++) {
            let y = canvas.height - ((amounts[i] - min) * canvas.height) / (max - min);
            let x = (canvasWidth / (amounts.length - 1)) * i;

            if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);

                let cp1x = prevX + (x - prevX) / smoothness;
                let cp1y = prevY;
                let cp2x = x - (x - prevX) / smoothness;
                let cp2y = y;

                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                ctx.strokeStyle = color;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, canvas.height);
            ctx.strokeStyle = `${color}40`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();

            prevX = x;
            prevY = y;
        }
    }, []);
    return <canvas id="balance-graph"></canvas>;
};

const Bank = () => {
    const [currentBalance, setCurrentBalance] = useState("");
    const [history, setHistory] = useState();
    const [timeAvailable, setTimeAvailable] = useState();

    const { businessid } = useParams();

    useEffect(() => {
        fetchCurrentBalance();
        fetchBalanceHistory();
        fetchTimeAvailable();
    }, []);

    const fetchCurrentBalance = async () => {
        const result = 5000;
        setCurrentBalance(result.toFixed(2));
    };

    const fetchBalanceHistory = async () => {
        const result = [
            { date: 1728690272002, available: 5127.5, amount_changed: -127.5, new_balance: 5000 },
            { date: 1728590272002, available: 4627.5, amount_changed: 500, new_balance: 5127.5 },
            { date: 1728490272002, available: 5127.5, amount_changed: -500, new_balance: 4627.5 },
            { date: 1728390272002, available: 4877.5, amount_changed: -250, new_balance: 5127.5 },
        ];
        setHistory(result);
    };

    const fetchTimeAvailable = async () => {
        const result = [
            { name: "Paid Time Off", days: 30 },
            { name: "Maternity/Paternity Leave", days: 90 },
            { name: "Personal Leave", days: 5 },
            { name: "Random Leave", days: 0 },
        ];
        setTimeAvailable(result);
    };

    const [playingAnimation, setPlayingAnimation] = useState(false);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleCashOut = async () => {
        if (playingAnimation) return;

        setPlayingAnimation(true);

        coverScreen();

        const text = document.getElementById("text");

        text.style.opacity = 0;
        await sleep(2000);
        text.style.opacity = 1;
        text.textContent = "Contacting server...";
        await sleep(2000);
        text.style.opacity = 0;
        await sleep(1200);
        text.textContent = "Transferring money...";
        text.style.opacity = 1;
        await sleep(4000);
        text.style.opacity = 0;
        await sleep(1200);
        text.textContent = "Cashed out successfully.";
        text.style.opacity = 1;
        await sleep(1500);
        text.style.opacity = 0;
        await sleep(500);
        uncoverScreen();
    };

    const coverScreen = async () => {
        const element = document.getElementsByClassName(bank_styles.circleAnimation)[0];
        element.style.opacity = 1;
        await sleep(1000);
        element.classList.add(bank_styles.circleAnimationForwards);
        await sleep(1500);
        element.classList.remove(bank_styles.circleAnimationForwards);
        element.style.width = 0;
        element.style.height = 0;
    };

    const uncoverScreen = async () => {
        const element = document.getElementsByClassName(bank_styles.circleAnimation)[0];

        element.classList.add(bank_styles.circleAnimationBackwards);
        await sleep(1500);
        element.classList.remove(bank_styles.circleAnimationBackwards);
        element.style.width = "150vmax";
        element.style.height = "150vmax";
        await sleep(500);
        element.style.opacity = 0;
        setPlayingAnimation(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={bank_styles.circleAnimation} style={{ pointerEvents: playingAnimation ? "all" : "none" }}>
                <p id="text" className={bank_styles.text}>
                    Cashed Out Successfully
                </p>
            </div>
            <section>
                <div className={bank_styles.balanceContainer}>
                    <BalanceGraph amounts={[500, 1000, 1500, 1280, 0, 500, 1800, 2000, 1500]} color={"#206035"} />
                    <div className={bank_styles.balance}>${currentBalance}</div>
                    <div className={styles.smallMargin}>Margin</div>
                    <div>
                        <div className={bank_styles.bankInfo}>
                            <p>Routing Number: Bank Info</p>
                            <p>Other stuff: Bank Info</p>
                        </div>
                        <div>
                            <Link to="/settings">Edit</Link>
                        </div>
                    </div>
                    <div className={styles.smallMargin}>Margin</div>
                    <div className={bank_styles.cashOut}>
                        <a
                            className="outlined-button-2"
                            onClick={() => {
                                handleCashOut();
                            }}
                        >
                            Withdraw
                        </a>
                    </div>
                </div>
            </section>
            <section className={bank_styles.historyContainer}>
                <div className={styles.smallMargin}>Margin</div>
                <div>Filters</div>
                <div className={styles.smallMargin}>Margin</div>
                <div className={bank_styles.mainHistory}>
                    <div>
                        <p>Date</p>
                        <p>Available</p>
                        <p>Amount Changed</p>
                        <p>New Balance</p>
                    </div>
                    {history &&
                        history.map((data, index) => {
                            return (
                                <div key={index}>
                                    <p>{new Intl.DateTimeFormat("en-US").format(new Date(data.date))}</p>
                                    <p>{data.available.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                                    <p style={{ color: data.amount_changed < 0 ? "red" : "green" }}>
                                        {data.amount_changed.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                                    </p>
                                    <p>{data.new_balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                                </div>
                            );
                        })}
                </div>
                <div className={styles.smallMargin}>Margin</div>
                <div className={styles.smallMargin}>Margin</div>
            </section>
        </div>
    );
};

export default Bank;
