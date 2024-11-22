import styles from "../styles/Main.module.css";
import login_styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import earthSrc from "../plainEarth.png";

const Login = () => {
    const [data, setData] = useState({});

    const handleInputChange = (key, value) => {
        let temp_data = data;
        temp_data[key] = value;
        setData(temp_data);
    };

    const login_request = () => {
        data.token = Cookies.get("token");
        console.log("data: ", data);
        fetch("http://localhost:8080/api/createBusiness", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + (await response.text()));
                }
                let result = await response.json();
                return await result;
            })
            .then((result) => {
                console.log("Success:", result);
                window.location.href = "/dashboard/" + result;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <section>
            <div className={styles.smallMargin}>Margin</div>
            <div className={login_styles.loginContainer}>
                <div className={login_styles.titleContainer}>
                    <h1>Create Business</h1>
                </div>
                <div>
                    <label>Business Name</label>
                    <input
                        required
                        placeholder=""
                        onChange={(e) => {
                            handleInputChange("name", e.target.value);
                        }}
                    ></input>
                </div>
                <div>
                    <label>Your Name</label>
                    <input
                        required
                        placeholder=""
                        onChange={(e) => {
                            handleInputChange("user_name", e.target.value);
                        }}
                    ></input>
                </div>
                <div>
                    <label>Your Position</label>
                    <input
                        required
                        placeholder=""
                        onChange={(e) => {
                            handleInputChange("position", e.target.value);
                        }}
                    ></input>
                </div>
                <div>
                    <label>Recovery Email</label>
                    <input
                        required
                        placeholder=""
                        onChange={(e) => {
                            handleInputChange("recovery_email", e.target.value);
                        }}
                    ></input>
                </div>
                <div>
                    <label>Banner URL</label>
                    <input
                        required
                        placeholder=""
                        onChange={(e) => {
                            handleInputChange("banner_url", e.target.value);
                        }}
                    ></input>
                </div>
                <div>
                    <label>Logo URL</label>
                    <input
                        required
                        placeholder=""
                        onChange={(e) => {
                            handleInputChange("logo_url", e.target.value);
                        }}
                    ></input>
                </div>
                <div>
                    <a
                        onClick={() => {
                            login_request();
                            // // do login stuff / call api and get token
                            // Cookies.set("token", "tokenvalue", { expires: 7, path: "/", secure: true, sameSite: "Strict" });
                            // // the cookie info doesnt need to be secure, since if a use modifies it, they are modifying their own token information
                            // // Cookies.get("token")
                            // window.location.href = "/dashboard";
                        }}
                        className={login_styles.submitLogin}
                    >
                        Create Business
                    </a>
                </div>
                <div>
                    <small>Everything can be modified later.</small>
                </div>
            </div>
            <div className={styles.smallMargin}>Margin</div>
        </section>
    );
};

export default Login;
