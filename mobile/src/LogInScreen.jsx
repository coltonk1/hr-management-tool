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
        <>
            <div className="log-in-screen">
                <img className="rocket-path" alt="rocket path" src={pathImg} />
                <img className="rocket" alt="rocket" src={rocketImg} />
                <img className="stars-main" alt="stars" src={starsMainImg} />
                <p className="text">or log in with face id</p>
                
                <div className="password-text-bar">
                    <input className="password-input" placeholder="PASSWORD" />
                </div>
                
                <div className="username-text-bar">
                    <input
			type="text"
			className="username-input"
			placeholder="USERNAME"
		    />
                </div>
                
                <img className="stars-left" alt="stars" src={starsLeftImg} />
                <img className="earth" alt="earth" src={earthImg} style={{ mixBlendMode: 'color-burn' }} />
                <img className="stars-right" alt="stars" src={starsRightImg} />
                
                <div className="sign-up">Sign up</div>
                <div className="log-in">
                    <button className="login-button">Log In</button>
		</div>
                
                <IphoneIcons className="iphone-icons" wifi={wifiImg} service={serviceImg} battery={batteryImg} />
            </div>
        </>
    );
};

export default LogInScreen;
