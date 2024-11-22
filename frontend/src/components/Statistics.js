import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";
import stats_style from "../styles/Stats.module.css";

import Cookies from "js-cookie";
import Graph from "./components/Graph";

const Stats = () => {
    const { businessid } = useParams();

    const [hourData, setHourData] = useState([]);

    const getEmployeeHours = async () => {
        let data = {
            token: Cookies.get("token"),
            business_id: businessid,
        };
        let result = await fetch("http://localhost:8080/api/getLastFourWeeks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let output = await result.json();

        const renamedData = output.map((item) => ({
            tag: item.week,
            value: item.total_hours,
        }));
        setHourData(renamedData);
    };

    useEffect(() => {
        getEmployeeHours();
    }, [businessid]);

    let testData = [];

    if (hourData.length === 0) {
        testData = [
            {
                name: "Colt",
                salary: 0,
                date_employed: new Date(),
                worked_hours: 0,
                balance: 0,
            },
        ];
    } else {
        testData = [
            {
                name: "Colton",
                salary: 90000,
                date_employed: 1728793477257,
                worked_hours: hourData[hourData.length - 1].value,
                balance: Math.floor(Math.random() * 5000) + 1000,
            },
        ];
    }

    return (
        <main className={styles.wrapper}>
            <section style={{ width: "fit-content", margin: "0 auto" }} className={stats_style.top_section}>
                {hourData.length > 0 ? (
                    <div className={stats_style.graphContainer}>
                        {/* <div className={stats_style.canvasContainer}>
                        <Graph amounts={amounts} id={"canvas1"} title={"Amount Payed"} />
                    </div> */}
                        <div className={stats_style.canvasContainer}>
                            <Graph amounts={hourData} id={"canvas2"} color={"#7033ff"} title={"Hours Worked"} />
                        </div>
                        {/* <div className={stats_style.canvasContainer}>
                        <Graph amounts={amounts2} id={"canvas3"} color={"#33ff70"} title={"Amount Cashed Out"} />
                    </div> */}
                        {/* <div className={stats_style.canvasContainer}>
                        <Graph amounts={amounts3} id={"canvas4"} color={"#aaaabb"} title={"Amount Not Cashed Out"} />
                    </div> */}
                        <div>
                            <div>
                                <p>Amount payed past week</p>
                                <title>
                                    {hourData.length > 0 &&
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                        }).format((hourData[hourData.length - 1].value * 90000) / 52 / 40)}
                                </title>
                            </div>
                            <div>
                                <p>Employee hours worked past week</p>
                                <title>{hourData.length > 0 && hourData[hourData.length - 1].value}</title>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Not enough data to display.</div>
                )}
            </section>
            <section>
                <div className={stats_style.mainList}>
                    <div>
                        <p>Name</p>
                        <p>Salary</p>
                        <p>Date Employed</p>
                        <p>Hours Worked</p>
                        <p>Pay this Week</p>
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
