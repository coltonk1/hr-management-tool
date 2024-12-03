import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../styles/Sidebar.module.css";

const BusinessCard = ({ name, id, banner_url }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.business_card} onClick={() => navigate(`/dashboard/${id}`)}>
            <h1>{name}</h1>
            <div className={styles.card_bg}>
                <img src={banner_url}></img>
            </div>
            <div className={styles.card_image}>
                <img src={banner_url}></img>
            </div>
        </div>
    );
};

const InitialView = () => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const getBusinesses = async (token) => {
        console.log(token);
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

    if (loading) {
        return <div>Loading data...</div>;
    }
    return (
        <div>
            <Link to="/createBusiness" className={styles.createInit}>
                Create a company
            </Link>
            <div className={styles.bc_container}>
                {data.map((element) => {
                    return <BusinessCard name={element.name} id={element.business_id} banner_url={element.banner_url} />;
                })}
            </div>
        </div>
    );
};

export default InitialView;
