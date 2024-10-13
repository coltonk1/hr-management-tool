import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";

const Support = () => {
    return (
        <div className={styles.wrapper}>
            <section>
                <div className={styles.supportContainer}>
                    <div>
                        <label>Your Email</label>
                        <input placeholder=""></input>
                    </div>
                    <div>
                        <label>Title</label>
                        <input placeholder=""></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea placeholder=""></textarea>
                    </div>
                    <a
                        style={{ color: "white", background: "linear-gradient(to bottom right, #fff1, #fff3)" }}
                        className="outlined-button-2"
                        onClick={() => {
                            // handleCashOut();
                        }}
                    >
                        Submit
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Support;
