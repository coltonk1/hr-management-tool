import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";
import stats_style from "../styles/Stats.module.css";

function formatNumber(num) {
    if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + "m"; // Millions with 2 decimals
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + "k"; // Thousands with 2 decimals
    } else {
        return num.toFixed(num % 1 === 0 ? 0 : 2); // No decimals for whole numbers, 2 decimals for fractions
    }
}

const Graph = ({ amounts, id, color = "#ff0000", title = "" }) => {
    const [currentDay, setCurrentDay] = useState(1728773189350);

    useEffect(() => {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext("2d");

        canvas.width = 1000;
        canvas.height = 300;

        // const amounts = [1000000, 1200000, 900000, 1500000, 1300000, 1750000, 1100000, 1400000, 1600000, 2000000];

        let max = 0;
        let min = amounts[0];
        for (let i = 0; i < amounts.length; i++) {
            max = Math.max(amounts[i], max);
            min = Math.min(amounts[i], min);
        }

        let difference = max - min;
        const labels = [
            formatNumber(max),
            formatNumber(max - difference / 4),
            formatNumber(max - (difference / 4) * 2),
            formatNumber(max - (difference / 4) * 3),
            formatNumber(min),
        ];
        const numRows = labels.length;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const rowSpacing = canvasHeight / (numRows + 1) - 15;

        ctx.fillStyle = "#252530";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "1em Inter, Calibri";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";

        for (let i = 0; i < numRows; i++) {
            const yPosition = rowSpacing * (i + 1) + 30;

            ctx.strokeStyle = "#484848";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(75, yPosition);
            ctx.lineTo(canvasWidth - 50, yPosition);
            ctx.stroke();

            ctx.fillText(labels[i], 70, yPosition + 5);
        }

        ctx.font = "45px bold Inter, Calibri";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.fillText(title, canvasWidth / 2, 45);

        for (let i = 0; i < amounts.length; i++) {
            const date = new Date(currentDay - 86400000 * 7 * (amounts.length - (i + 1)));
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const date2 = new Date(currentDay - 86400000 * 7 * (amounts.length - (i + 0)) + 86400000);
            const month2 = date2.getMonth() + 1;
            const day2 = date2.getDate();

            const xPosition = ((canvasWidth - 125) / (amounts.length - 1)) * i + 75 + 10;

            ctx.strokeStyle = "#484848";
            ctx.lineWidth = 2;

            ctx.save();
            ctx.translate(xPosition, canvasHeight - 80);
            ctx.rotate((-60 / 360) * 2 * Math.PI);
            ctx.font = ".8em Inter, Calibri";
            ctx.fillStyle = "#eee";
            ctx.textAlign = "right";
            ctx.fillText(`${month2}/${day2}-${month}/${day}`, 0, 0);
            ctx.restore();
        }

        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `${color}a0`);
        gradient.addColorStop(1, `${color}00`);

        ctx.beginPath();

        ctx.moveTo(75, rowSpacing * 5 + 30);
        ctx.lineTo(75, rowSpacing * 5 - ((amounts[0] - min) * (rowSpacing * 4)) / (max - min) + 30);
        const smoothness = 3;

        for (let i = 0; i < amounts.length; i++) {
            let y = rowSpacing * 5 - ((amounts[i] - min) * (rowSpacing * 4)) / (max - min) + 30;
            let x = ((canvasWidth - 125) / (amounts.length - 1)) * i + 75;

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

        // Close the path by connecting the last point to the bottom
        ctx.lineTo(prevX, rowSpacing * 5 + 30);

        // Fill the closed path with the gradient
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Now, redraw the red lines and circles
        for (let i = 0; i < amounts.length; i++) {
            let y = rowSpacing * 5 - ((amounts[i] - min) * (rowSpacing * 4)) / (max - min) + 30;
            let x = ((canvasWidth - 125) / (amounts.length - 1)) * i + 75;

            // Draw the curved lines (Bezier curves) between circles
            if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);

                // Control points to make the curve smooth
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
            ctx.lineTo(x, rowSpacing * 5 + 30);
            ctx.strokeStyle = `${color}40`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();

            // Save the current point as the previous for the next iteration
            prevX = x;
            prevY = y;
        }

        ctx.lineWidth = 2;
    }, []);

    return <canvas id={id} className={stats_style.canvas}></canvas>;
};

const Stats = () => {
    const { businessid } = useParams();

    const amounts = [];

    for (let i = 0; i < 4; i++) {
        // Generate random values between 3000 and 4000, and multiply by 3
        const randomValue = Math.floor(Math.random() * 1000) + 30000;
        amounts.push(randomValue * 3);
    }

    const amounts2 = [];

    for (let i = 0; i < 4; i++) {
        const randomValue = Math.floor(Math.random() * 1000) + 10000;
        amounts2.push(randomValue * 3);
    }

    const amounts3 = [];

    for (let i = 0; i < 4; i++) {
        amounts3.push(amounts[i] - amounts2[i]);
    }

    const hours = [30, 40, 50, 60];

    const testData = [
        {
            name: "Colton Karaffa",
            salary: Math.floor(Math.random() * 50000) + 50000,
            date_employed: 1728793477257,
            worked_hours: Math.floor(Math.random() * 50),
            balance: Math.floor(Math.random() * 5000) + 1000,
        },
        {
            name: "Colton Karaffa",
            salary: Math.floor(Math.random() * 50000) + 50000,
            date_employed: 1728793477257,
            worked_hours: Math.floor(Math.random() * 50),
            balance: Math.floor(Math.random() * 5000) + 1000,
        },
        {
            name: "Colton Karaffa",
            salary: Math.floor(Math.random() * 50000) + 50000,
            date_employed: 1728793477257,
            worked_hours: Math.floor(Math.random() * 50),
            balance: Math.floor(Math.random() * 5000) + 1000,
        },
        {
            name: "Colton Karaffa",
            salary: Math.floor(Math.random() * 50000) + 50000,
            date_employed: 1728793477257,
            worked_hours: Math.floor(Math.random() * 50),
            balance: Math.floor(Math.random() * 5000) + 1000,
        },
    ];

    return (
        <main className={styles.wrapper}>
            <section style={{ width: "fit-content", margin: "0 auto" }}>
                <title style={{ color: "#303035", textAlign: "left", marginTop: "20px" }}>Some Business, LLC</title>
                <div className={stats_style.graphContainer}>
                    <div className={stats_style.canvasContainer}>
                        <Graph amounts={amounts} id={"canvas1"} title={"Amount Payed"} />
                    </div>
                    <div className={styles.smallMargin}>Margin</div>
                    <div className={stats_style.canvasContainer}>
                        <Graph amounts={hours} id={"canvas2"} color={"#7033ff"} title={"Hours Worked"} />
                    </div>
                    <div className={styles.smallMargin}>Margin</div>
                    <div className={stats_style.canvasContainer}>
                        <Graph amounts={amounts2} id={"canvas3"} color={"#33ff70"} title={"Amount Cashed Out"} />
                    </div>
                    <div className={styles.smallMargin}>Margin</div>
                    <div className={stats_style.canvasContainer}>
                        <Graph amounts={amounts3} id={"canvas4"} color={"#aaaabb"} title={"Amount Not Cashed Out"} />
                    </div>
                    <div>
                        <div>
                            <p>Amount payed past week</p>
                            <title>
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    maximumFractionDigits: 0,
                                }).format(amounts[amounts.length - 1])}
                            </title>
                        </div>
                        <div>
                            <p>Employee hours worked past week</p>
                            <title>930</title>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={stats_style.mainList}>
                    <div>
                        <p>Name</p>
                        <p>Salary</p>
                        <p>Date Employed</p>
                        <p>Payable Worked Hours</p>
                        <p>Pay So Far</p>
                        <p>Balance</p>
                    </div>
                    {testData &&
                        testData.map((data) => {
                            return (
                                <div>
                                    <p>{data.name}</p>
                                    <p>
                                        {data.salary.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                        })}
                                    </p>
                                    <p>{new Date(data.date_employed).toLocaleDateString("en-US").toString()}</p>
                                    <p>{data.worked_hours}</p>
                                    <p>
                                        {((data.salary / 52) * (data.worked_hours / 40)).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                        })}
                                    </p>
                                    <p>
                                        {data.balance.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                        })}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </section>
        </main>
    );
};

export default Stats;
