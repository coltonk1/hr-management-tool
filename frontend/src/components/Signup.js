import styles from "../styles/Main.module.css";
import login_styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

import earthSrc from "../plainEarth.png";

const Login = () => {
    const [data, setData] = useState({ status: "active" });

    const handeInputChange = (key, target) => {
        // if (!target.validity.valid) {
        //     document.querySelector(`#${target.id}_error`).textContent = target.validationMessage;
        // } else {
        //     document.querySelector(`#${target.id}_error`).textContent = "";
        // }
        let temp_data = data;
        temp_data[key] = target.value;
        setData(temp_data);
    };

    const signup = () => {
        console.log("data: ", data);
        fetch("http://localhost:8080/api/signup", {
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
                return response.text();
            })
            .then((result) => {
                console.log("Success:", result);
                window.location.href = "/login";
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
                    <h1>Create Your Account</h1>
                    <p>Join Polaris to get started</p>
                </div>
                <div>
                    <label className={login_styles.required}>Full Name</label>
                    <input
                        id="full_name_input"
                        onChange={(e) => {
                            handeInputChange("fullName", e.target);
                        }}
                        placeholder=""
                        required
                    ></input>
                    {/* <span id="full_name_input_error"></span> */}
                </div>
                <div>
                    <label className={login_styles.required}>Username</label>
                    <input
                        id="username_input"
                        onChange={(e) => {
                            handeInputChange("username", e.target);
                        }}
                        placeholder=""
                        required
                    ></input>
                    {/* <span id="username_input_error"></span> */}
                </div>
                <div>
                    <label className={login_styles.required}>Email</label>
                    <input
                        id="email_input"
                        onChange={(e) => {
                            handeInputChange("email", e.target);
                        }}
                        placeholder=""
                        required
                        type="email"
                    ></input>
                    {/* <span id="email_input_error"></span> */}
                </div>

                <div>
                    <label className={login_styles.required}>Password</label>
                    <input
                        id="password_input"
                        onChange={(e) => {
                            handeInputChange("password", e.target);
                        }}
                        placeholder=""
                        required
                        type="password"
                    ></input>
                    {/* <span id="password_input_error"></span> */}
                </div>
                <div>
                    <label className={login_styles.required}>Confirm Password</label>
                    <input id="confirm_password_input" placeholder="" required></input>
                    {/* <span id="confirm_password_input_error"></span> */}
                </div>
                <div>
                    <a
                        onClick={() => {
                            signup();
                        }}
                        className={login_styles.submitLogin}
                    >
                        Create Account
                    </a>
                </div>
                <div>
                    <p>
                        By signing up, you agree to our <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>
                    </p>
                </div>
                <div>
                    <p>
                        Already have an account? <Link to={"/login"}>Sign in</Link>
                    </p>
                </div>
            </div>
            <div className={styles.smallMargin}>Margin</div>
            <div className={login_styles.earthContainer}>
                <img className={login_styles.earth} src={earthSrc}></img>
            </div>
        </section>
    );
};

export default Login;
