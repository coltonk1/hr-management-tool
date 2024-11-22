import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";
import profile_styles from "../styles/Profile.module.css";
import Cookies from "js-cookie";

import Graph from "./components/Graph";

import star_src from "../shooting_stars.png";

const Bank = () => {
    const { businessid, userid } = useParams();

    const [data, setData] = useState([]);
    const [employeeData, setEmployeeData] = useState({});
    const [eventData, setEventData] = useState([]);

    const getEmployeeData = async (data_) => {
        let result = await fetch("http://localhost:8080/api/getEmployeeDataPublic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data_),
        });

        const output = await result.json();
        console.log(output);
        setEmployeeData(output);
    };

    const getUserEventsById = async (data_) => {
        let result = await fetch("http://localhost:8080/api/getUserEventsById", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data_),
        });

        const output = await result.json();
        console.log(output);
        setEventData(output);
    };

    useEffect(() => {
        const token = Cookies.get("token");
        getEmployeeData({ token: token, user_id: userid, business_id: businessid });
        getUserEventsById({ token: token, user_id: userid, business_id: businessid });
    }, [businessid, userid]);

    const getEmployeeHours = async () => {
        let data = {
            token: Cookies.get("token"),
            user_id: userid,
            business_id: businessid,
        };
        let result = await fetch("http://localhost:8080/api/getEmployeeHoursWorked", {
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
        setData(renamedData);
    };

    useEffect(() => {
        getEmployeeHours();
    }, []);

    const amounts = [42, 30, 40, 50, 60, 55, 40, 0, 0, 9, 42, 42, 30, 40, 50, 60, 55, 40, 0, 0, 9, 42, 40, 38, 29, 40];

    for (let i = 0; i < amounts.length; i++) {
        let randomValue = Math.floor(Math.random() * 20) - 10;
        if (amounts[i] + randomValue < 0) randomValue = 0;
        amounts[i] += randomValue;
    }

    return (
        <div className={styles.wrapper}>
            <section className={profile_styles.top_section}>
                <div className={profile_styles.profile}>
                    <div className={profile_styles.profile_image}>
                        <img src="https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"></img>
                    </div>

                    <div className={profile_styles.profile_details}>
                        <div className={profile_styles.name}>
                            <p>{employeeData.name}</p> <p>[{employeeData.position}]</p>
                            {employeeData.department && <p> [{employeeData.department}]</p>}
                        </div>
                    </div>
                </div>

                <div className={profile_styles.description}>
                    <p>{employeeData.description}</p>
                </div>

                <div className={profile_styles.stats}>
                    <Graph amounts={data} id={"profile_graph"} color={"#8888ff"} title={"Hours Worked"} overrideMin />
                    <p>Employee since {employeeData.hiring_date}</p>
                    <p>Worked a total of {employeeData.total_hours} hours</p>
                </div>

                {/* <div className={profile_styles.note}>
                    <p>10/10/2024</p>{" "}
                    <div>
                        Late <p>[John Doe]</p>
                    </div>{" "}
                    <p>
                        Arrived 10 minutes late to his shift today. This is the second time this week. No major impact on work, but it's
                        something to monitor if it becomes a pattern.
                    </p>
                </div> */}
                {/* <div className={profile_styles.note}>
                    <p>10/08/2024</p>{" "}
                    <div>
                        Late <p>[Person Reporting]</p>
                    </div>{" "}
                    <p>Arrived 15 minutes late to his shift today. Minor impact on work.</p>
                </div>

                <div>
                    <p>Requests:</p>
                    <p>Meeting with (Someone [Position] [Department], Someone [Position] [Department])</p>
                    <p>Regarding: Their relationship</p>
                    <p>For 3:00pm, 10/17/2024</p>
                    <p>Message | Approve | Approve with Condition | Deny</p>
                </div> */}

                <h1>Upcoming</h1>
                <div className={profile_styles.element_container}>
                    {eventData.map((item) => {
                        console.log(item);
                        return (
                            <div className={profile_styles.element}>
                                <h1>
                                    {item.title}
                                    <p>{item.on_date}</p>
                                </h1>
                                <p>{item.description}</p>

                                <div>
                                    <p>{item.created_by}</p>
                                    <p>{item.created_time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* <div>
                    Minified Stats
                    <p>Update information</p>
                </div> */}
            </section>
        </div>
    );
};

export default Bank;
