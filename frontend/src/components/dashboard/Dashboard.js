import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";
import NotFound from "../NotFound";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Calendar from "../Events";
import { ExpandedCalendar } from "../Events";
import Cookies from "js-cookie";

const Message = ({ message = "Did you want the soup in the salad aisle?" }) => {
    return (
        <div className={styles.message}>
            <h2 className={styles.message_time}>11/13/24 12:32pm</h2>
            <div className={styles.from}>
                <img src="https://i.pinimg.com/736x/28/a9/22/28a9225f4c951fcb8395ae1b226a1714.jpg"></img>
                <div>
                    <p>Billy</p>
                    <p>Restocker</p>
                </div>
            </div>
            <p>{message}</p>
        </div>
    );
};

const Dashboard = () => {
    const { businessid } = useParams();
    const [employeeData, setEmployeeData] = useState({});

    const getEmployeeData = async (data) => {
        let result = await fetch("http://localhost:8080/api/getEmployeeData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const output = await result.json();
        console.log(output);
        setEmployeeData(output);
    };

    useEffect(() => {
        const token = Cookies.get("token");
        console.log(businessid);
        getEmployeeData({ token: token, business_id: businessid });
    }, [businessid]);

    const [expanded, setExpanded] = useState(false);
    const switchRef = useRef(null);
    const [switched, setSwitched] = useState(false);
    const navigate = useNavigate();
    return (
        <div className={styles.dashboard_container}>
            <Sidebar />
            <div className={styles.dashboard_upper}>
                <div className={styles.user}>
                    <img
                        src="https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"
                        onClick={() => {
                            navigate(`/${employeeData.business_id}/profile/${employeeData.id}`);
                        }}
                    ></img>
                    <p>{employeeData.name}</p>
                    {/* <img src="https://cdn-icons-png.flaticon.com/256/666/666162.png"></img> */}
                    <p>{employeeData.position}</p>

                    <div className={styles.messageContainer}>
                        <h1>Notifications</h1>
                        <Message />
                        <Message message={"Meeting Request"} />
                        <Message message={"Two Weeks Notice"} />
                        <Message />
                    </div>

                    <div
                        className={styles.hr_switch}
                        onClick={() => {
                            if (switched) {
                                switchRef.current.style.left = "0";
                                setSwitched(!switched);
                            } else {
                                switchRef.current.style.left = "100px";
                                setSwitched(!switched);
                            }
                        }}
                    >
                        <div className={styles.selected} ref={switchRef}></div>
                    </div>
                </div>

                <div className={styles.dashboard_content}>
                    <div className={styles.dashboard_inner}>
                        <div
                            style={{
                                transform: `translate(${expanded ? "0" : "100vw"})`,
                                transition: "1s",
                                zIndex: "10",
                                position: "relative",
                            }}
                        >
                            <ExpandedCalendar
                                month={10}
                                year={2024}
                                information={[
                                    {
                                        day: 13,
                                        month: 9,
                                        year: 2024,
                                        title: "Do something",
                                        description: "",
                                        color: "red",
                                        from: 540,
                                        to: 1020,
                                    },
                                ]}
                            />
                        </div>
                        <div className={styles.top}>
                            <Outlet />
                        </div>
                    </div>
                    <Calendar
                        move={(amt) => {
                            // move calendar left or right
                        }}
                        expand={() => {
                            setExpanded(!expanded);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
