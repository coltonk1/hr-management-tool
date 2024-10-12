import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Main.module.css";
import bank_styles from "../styles/Bank.module.css";

const Bank = () => {
    const [currentBalance, setCurrentBalance] = useState("");
    const [history, setHistory] = useState();
    const [timeAvailable, setTimeAvailable] = useState();
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
    return (
        <div className={styles.wrapper}>
            <section>
                <div className={styles.split}>
                    <div className={bank_styles.balanceContainer}>
                        <p>Current balance</p>
                        <div className={bank_styles.balance}>${currentBalance}</div>
                        <div className={styles.smallMargin}>Margin</div>
                        <div className={styles.split}>
                            <div>
                                <p>Routing Number: Bank Info</p>
                                <p>Other stuff: Bank Info</p>
                            </div>
                            <div>
                                <Link to="/settings">Edit</Link>
                            </div>
                        </div>
                        <div className={styles.smallMargin}>Margin</div>
                        <div className={bank_styles.cashOut}>
                            <a className="outlined-button-2">Cash out</a>
                        </div>
                    </div>
                    <div className={bank_styles.vacationDays}>
                        {timeAvailable &&
                            timeAvailable.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <p style={{ color: data.days === 0 ? "#faa" : "#fff" }}>{data.name}</p>
                                        <p style={{ color: data.days === 0 ? "#faa" : "#dfdfdf" }}>{data.days} Days</p>
                                    </div>
                                );
                            })}
                        <div className={styles.smallMargin}>Margin</div>
                        <Link to="/more" className="outlined-button">
                            Request Time Off
                        </Link>
                    </div>
                </div>
            </section>
            <section className={bank_styles.historyContainer}>
                <div className={bank_styles.background}></div>
                <div className={styles.smallMargin}>Margin</div>
                <title style={{ color: "#303035" }}>History</title>
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
