import React from "react";
import axios from "axios";

// Functional Button component
const TestButton = () => {
    const onClick = async () => {
        let username = "wilber1234";
        let password = "password";

        const userData = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/signup", userData);
            console.log(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return <button onClick={onClick}>Click Me Please</button>;
};

export default TestButton;
