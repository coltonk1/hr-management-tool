import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";
import profile_styles from "../styles/Profile.module.css";

import Graph from "./components/Graph";

import star_src from "../shooting_stars.png";

const Bank = () => {
    const { businessid, userid } = useParams();

    useEffect(() => {}, []);

    const amounts = [42, 30, 40, 50, 60, 55, 40, 0, 0, 9, 42, 42, 30, 40, 50, 60, 55, 40, 0, 0, 9, 42, 40, 38, 29, 40];

    for (let i = 0; i < amounts.length; i++) {
        let randomValue = Math.floor(Math.random() * 20) - 10;
        if (amounts[i] + randomValue < 0) randomValue = 0;
        amounts[i] += randomValue;
    }

    return (
        <div className={styles.wrapper}>
            <section>
                <div className={profile_styles.profile}>
                    <div className={profile_styles.profile_image}>
                        <img src="https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"></img>
                    </div>

                    <div className={profile_styles.profile_details}>
                        <div className={profile_styles.name}>
                            <p>Colton Karaffa</p> <p>[Software Developer]</p>
                            <p> [Software Department]</p>
                        </div>
                        <p>@colton.k1</p>
                    </div>
                </div>

                <div>
                    <p>
                        Personal description for anyone visiting their profile. For example: Out of office, send me a message or email me at
                        email@email.com and I will respond when I can.
                    </p>
                </div>

                <div className={profile_styles.stats}>
                    <Graph amounts={amounts} id={"profile_graph"} color={"#8888ff"} title={"Hours Worked"} />
                    <p>Employee since 10/10/2010</p>
                    <p>Worked a total of 6580 hours</p>
                </div>

                <div className={profile_styles.note}>
                    <p>10/10/2024</p>{" "}
                    <div>
                        Late <p>[John Doe]</p>
                    </div>{" "}
                    <p>
                        Arrived 10 minutes late to his shift today. This is the second time this week. No major impact on work, but it's
                        something to monitor if it becomes a pattern.
                    </p>
                </div>
                <div className={profile_styles.note}>
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
                </div>

                <div>Calendar</div>

                <div>
                    Minified Stats
                    <p>Update information</p>
                </div>
            </section>
        </div>
    );
};

export default Bank;
