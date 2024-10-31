import React from "react";
import "./style.css";
import serviceImg from "./images/service.png"; 
import wifiImg from "./images/wifi.png";  
import batteryImg from "./images/battery.png";
import PropTypes from 'prop-types';

export const IphoneIcons = ({
    className,
    service = serviceImg,
    wifi = wifiImg,
    battery = batteryImg,
}) => {
    return (
	<div className={`iphone-icons ${className}`}>
	    <img className="service" alt="Service" src={service} />
	    <img className="wifi" alt="Wifi" src={wifi} />
	    <img className="battery" alt="Battery" src={battery} />
	    <div className="text-wrapper">9:35</div>
	</div>
    );
};

IphoneIcons.propTypes = {
    className: PropTypes.string,
    service: PropTypes.string,
    wifi: PropTypes.string,
    battery: PropTypes.string,
};
