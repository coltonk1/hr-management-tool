import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forms.css";
import ExpenseCardGraphic from "./ExpenseCardGraphic";

// Functional Button component
const NewExpenseCardForm = () => {
    const [formData, setFormData] = useState({
        expense_card_number: "",
        expense_card_expiration_date: "",
        expense_card_secuirty_code: "",
        issuance_date: "",
        status: "",
        expense_card_limit: "",
        employee_id: "",
        error_message: "",
    });
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    // generate a random expense card security pin
    const getRandomExpenseCardSecurityPin = () => {
        let randomSecurityPin = getRandomInt(100, 999);
        setFormData((prevState) => ({
            ...prevState,
            expense_card_secuirty_code: randomSecurityPin,
        }));
    };

    // generate a random string of 16 digits to act as a card number
    const getRandomExpenseCardNumber = () => {
        let randomCardNumber = "";
        for (let i = 0; i < 4; i++) {
            randomCardNumber = randomCardNumber + "" + getRandomInt(1000, 9999);
        }
        setFormData((prevState) => ({
            ...prevState,
            expense_card_number: randomCardNumber,
        }));
    };

    // generate a random integer between min and max
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // updates form fields when changed
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // gets a list of all users to populate the employee select menu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/get_all_users");

                let names = response.data.map((person, index) => "EID: " + index + " - " + person.firstName + " " + person.lastName);

                setOptions(names);

                console.log(response.data);
            } catch (error) {
                console.log(error.response.data);
                setFormData((prevState) => ({
                    ...prevState,
                    error_message: error.response.data,
                }));
            }
        };
        fetchData();
    }, []);

    // function that handles form submit
    const onClick = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior (reloading)

        let error_report = "Error: The following must be filled in - ";

        if (formData.expense_card_limit == 0) {
            error_report += "Card Limit";
        }
        if (formData.expense_card_number == "") {
            error_report += " Card Number";
        }
        if (formData.pinCode == "") {
            error_report += " Pin Code";
        }

        const userData = {
            expense_card_number: formData.expense_card_number,
            expense_card_expiration_date: formData.expense_card_expiration_date,
            expense_card_secuirty_code: formData.expense_card_secuirty_code,
            issuance_date: getCurrentDate(),
            status: "Active",
            expense_card_limit: formData.expense_card_limit,
            employee_id: +selectedOption.split(" ")[1],
        };
        console.log("Form Data:", userData); // Here you can send the formData to a server via an API call

        try {
            const response = await axios.post("http://localhost:8080/api/create_new_expense_card", userData);
            console.log(response);
        } catch (error) {
            console.error("Error fetching data:", error.response.data);
            setFormData((prevState) => ({
                ...prevState,
                error_message: error.response.data,
            }));
        }
    };

    // function gets current date to set as issuance date for expense card
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`; // Returns in YYYY-MM-DD format
    }

    return (
        <form onSubmit={onClick}>
            <h2 className="form_title">New Expense Card Form</h2>
            <div className="form_group">
                <label className="form_label" htmlFor="first_name">
                    Expense Card Information
                </label>
                <div id="expense_card_graphic_container">
                    <div className="form_group">
                        <input
                            className="form_field"
                            type="text"
                            id="expense_card_limit"
                            name="expense_card_limit"
                            value={formData.expense_card_limit}
                            onChange={handleChange}
                            placeholder=" Expense Card Limit"
                        />

                        <div id="button_input_combo">
                            <input
                                className="form_field"
                                type="text"
                                id="expense_card_number"
                                name="expense_card_number"
                                value={formData.expense_card_number}
                                onChange={handleChange}
                                placeholder=" Expense Card Number"
                            />
                            <button onClick={getRandomExpenseCardNumber}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="160 -960 1000 960"
                                    width="24px"
                                    fill="#cccbcb"
                                >
                                    <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
                                </svg>
                            </button>
                        </div>
                        <div id="button_input_combo">
                            <input
                                className="form_field"
                                type="text"
                                id="expense_card_pin_code"
                                name="expense_card_pin_code"
                                value={formData.expense_card_secuirty_code}
                                onChange={handleChange}
                                placeholder=" Pin Code"
                            ></input>
                            <button onClick={getRandomExpenseCardSecurityPin}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="160 -960 1000 960"
                                    width="24px"
                                    fill="#cccbcb"
                                >
                                    <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <ExpenseCardGraphic
                        cardNumber={formData.expense_card_number}
                        expirationDate={formData.expense_card_expiration_date}
                        cardholder={selectedOption}
                    />
                </div>
            </div>
            <div className="form_group">
                <label className="form_label">Employee Information</label>
                <div>
                    <select
                        className="form_field"
                        type="text"
                        id="employee_id"
                        name="employee_id"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        placeholder="Expnese Category"
                        defaultValue="Employee Id"
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <input
                        className="form_field"
                        type="text"
                        id="expense_card_expiration_date"
                        name="expense_card_expiration_date"
                        value={formData.expense_card_expiration_date}
                        onChange={handleChange}
                        placeholder=" Expiration Date (YYYY-MM-DD)"
                    ></input>
                </div>
            </div>
            <div className="submit_cancel_error_group">
                <div className="form_group">
                    <button id="issue_expense_card_button" type="submit">
                        Issue New Expense Card
                    </button>
                    <button id="cancel_new_expense_card_button">Cancel</button>
                </div>
                {formData.error_message === "" ? <div></div> : <div id="create_employee_error_message">{formData.error_message}</div>}
            </div>
        </form>
    );
};

export default NewExpenseCardForm;
