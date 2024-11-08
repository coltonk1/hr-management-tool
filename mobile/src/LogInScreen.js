import React from "react";
import { IphoneIcons } from "./components/IphoneIcons";
import serviceImg from "./components/images/service.png";
import wifiImg from "./components/images/wifi.png";
import batteryImg from "./components/images/battery.png";
import earthImg from "./assets/earth.png";
import pathImg from "./assets/rocket-path-1.png";
import rocketImg from "./assets/rocket-1.png";
import starsMainImg from "./assets/stars-main.png";
import starsLeftImg from "./assets/stars-left.png";
import starsRightImg from "./assets/stars-right.png";
import "./style.css";

export const LogInScreen = () => {
    return (
        <main className="log-in-screen">
            <img className="rocket-path background-image" alt="rocket path" src={pathImg} />
            <img className="rocket background-image" alt="rocket" src={rocketImg} />
            <img className="stars-main background-image" alt="stars" src={starsMainImg} />
            <img className="stars-left background-image" alt="stars" src={starsLeftImg} />
            <img className="earth background-image" alt="earth" src={earthImg} style={{ mixBlendMode: "color-burn" }} />
            <img className="stars-right background-image" alt="stars" src={starsRightImg} />

            <div className="input-container">
                <div className="username-container">
                    <label></label>
                    <input type="text" id="username" placeholder="Username" />
                </div>
                <div className="password-container">
                    <label></label>
                    <input type="password" id="password" placeholder="Password" />
                </div>
                <div className="smallMargin"></div>
            </div>

            <div className="submit-container">
                <button className="login-button">Log In</button>
                <button className="signup-button">Create an account</button>
            </div>

            <div className="other-login-methods">
                <div className="face-id">
                    <img src="https://cdn3.iconfinder.com/data/icons/new-apple-product-line/24/face_id-512.png"></img>
                </div>
            </div>
        </main>
    );
};

export default LogInScreen;
