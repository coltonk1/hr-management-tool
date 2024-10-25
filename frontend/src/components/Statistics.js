import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";
import stats_style from "../styles/Stats.module.css";

import Graph from "./components/Graph";

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
