import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";
import settings_icon from "../../resources/settings_icon.svg";
import attendance_icon from "../../resources/attendance_icon.svg";
import payments_icon from "../../resources/payments_icon.svg";
import summary_icon from "../../resources/summary_icon.svg";
import people_icon from "../../resources/people_icon.svg";
import Cookies from "js-cookie";
import arrow_up from "../../resources/arrow_up.svg";
import arrow_down from "../../resources/arrow_down.svg";
import arrow_left from "../../resources/arrow_left.svg";
import arrow_right from "../../resources/arrow_right.svg";
import logout from "../../resources/logout.svg";

const Sidebar = () => {
    // const getBusinesses = () => {
    //     // use id to call
    //     const result = [
    //         { name: "ILP", id: "1234" },
    //         { name: "Other", id: "4321" },
    //         { name: "Other2", id: "5912" },
    //     ];

    //     setData(result);
    // };

    const sideBarRef = useRef(null);
    const buttonRef = useRef(null);
    const [expanded, setExpanded] = useState(true);

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const getBusinesses = async (token) => {
        let result = await fetch("http://localhost:8080/api/findUserBusinesses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data_ = await result.json();

        console.log(data_);
        setData(data_);

        setLoading(false);
    };

    useEffect(() => {
        const token = Cookies.get("token");
        getBusinesses(token);
    }, []);

    return (
        <div className={styles.sidebar} ref={sideBarRef}>
            <p
                ref={buttonRef}
                className={styles.expand}
                onClick={() => {
                    if (expanded) {
                        sideBarRef.current.style.width = 0;
                        sideBarRef.current.style.padding = "7px";
                        buttonRef.current.style.background = "linear-gradient(to right, #eee, #bbb)";
                        setExpanded(!expanded);
                    } else {
                        sideBarRef.current.style.width = "300px";
                        sideBarRef.current.style.padding = "20px";
                        buttonRef.current.style.background = "transparent";
                        setExpanded(!expanded);
                    }
                }}
            >
                {expanded ? (
                    <div className={styles.arrow_container}>
                        <img className={styles.arrow} src={arrow_left}></img>
                    </div>
                ) : (
                    <div className={styles.arrow_container}>
                        <img className={styles.arrow} src={arrow_right}></img>
                    </div>
                )}
            </p>
            {data &&
                data.map((item, index) => {
                    return <Business key={index} item={item} />;
                })}

            <Link to="/createBusiness" className={styles.create}>
                Create a company
            </Link>
            <div className={styles.logout}>
                <img src={logout}></img>Log out
            </div>
        </div>
    );
};

const Business = ({ item }) => {
    const { businessid } = useParams();
    console.log(businessid, item.business_id);
    return (
        <div className={`${styles.element} ${businessid == item.business_id ? styles.active_element : ""}`}>
            <div className={styles.business_container}>
                <div className={styles.business_bg}>
                    <img src={item.banner_url}></img>
                </div>
                <img src={item.logo_url}></img>
                <p>{item.name}</p>
            </div>

            <Nav id={item.business_id} />
        </div>
    );
};

const Nav = ({ id }) => {
    const navRef = useRef(null);
    const [expanded, setExpanded] = useState(false);

    return (
        <nav id="nav" className={styles.nav} ref={navRef}>
            <p
                className={styles.drop}
                onClick={() => {
                    if (expanded) {
                        navRef.current.style.maxHeight = "25px";
                        setExpanded(!expanded);
                    } else {
                        navRef.current.style.maxHeight = "100%";
                        setExpanded(!expanded);
                    }
                }}
            >
                {expanded ? <img className={styles.arrow} src={arrow_up}></img> : <img className={styles.arrow} src={arrow_down}></img>}
            </p>
            <li className={styles.li}>
                <img className={styles.icon} src={summary_icon}></img>
                <Link className={styles.li} to={`/dashboard/${id}/`}>
                    Summary
                </Link>
            </li>
            <li className={styles.li}>
                <img className={styles.icon} src={attendance_icon}></img>
                <Link className={styles.li} to={`/dashboard/${id}/payments`}>
                    Bank
                </Link>
            </li>
            <li className={styles.li}>
                <img className={styles.icon} src={people_icon}></img>
                <Link className={styles.li} to={`/dashboard/${id}/people`}>
                    People
                </Link>
            </li>

            <li className={styles.li}>
                <img className={styles.icon} src={payments_icon}></img>
                <Link className={styles.li} to={`/dashboard/${id}/payments`}>
                    Payments
                </Link>
            </li>
            <li className={styles.li}>
                <img className={styles.icon} src={settings_icon}></img>
                <Link className={styles.li} to={`/dashboard/${id}/settings`}>
                    Settings
                </Link>
            </li>
        </nav>
    );
};

export default Sidebar;
