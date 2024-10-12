import React, { useState } from "react";
import axios from "axios";
import "./Forms.css";

// Functional Button component
const NewEmployeeForm = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        personal_email: "",
        street_address: "",
        city_address: "",
        state_address: "",
        postal_code_address: "",
        ssn: "",
        birthday: "",
        username: "",
        password: "",
        confirm_password: "",
        position_id: "",
        error_message: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // function gets current date to set as issuance date for expense card
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`; // Returns in YYYY-MM-DD format
    }

    const onClick = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior (reloading)

        let first_name = formData.first_name;
        let last_name = formData.last_name;
        let phone_number = formData.phone_number;
        let personal_email = formData.personal_email;
        let street_address = formData.street_address;
        let city_address = formData.city_address;
        let state_address = formData.state_address;
        let postal_code_address = formData.postal_code_address;
        let ssn = formData.ssn;
        let birthday = formData.birthday;
        let username = formData.username;
        let password = formData.password;
        let status = "pending";
        let hiring_date = getCurrentDate();
        let position_id = 9; // default unassigned position
        let salary = 0.0; // default salary before being assigned a position

        if (formData.password === "" || formData.password !== formData.confirm_password) {
            setFormData((prevState) => ({
                ...prevState,
                error_message: "Passwords must match and must not be empty.",
            }));
            return;
        }
        if (
            formData.first_name === "" ||
            formData.last_name === "" ||
            formData.phone_number === "" ||
            formData.personal_email === "" ||
            formData.street_address === "" ||
            formData.city_address === "" ||
            formData.state_address === "" ||
            formData.postal_code_address === "" ||
            formData.ssn === "" ||
            formData.birthday === "" ||
            formData.username === ""
        ) {
            setFormData((prevState) => ({
                ...prevState,
                error_message: "Please fill in all fields",
            }));
            return;
        }

        setFormData((prevState) => ({
            ...prevState,
            error_message: "",
        }));

        const userData = {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            ssn: ssn,
            personal_email: personal_email,
            street_address: street_address,
            city_address: city_address,
            state_address: state_address,
            postal_code_address: postal_code_address,
            birthday: birthday,
            username: username,
            password: password,
            status: status,
            hiring_date: hiring_date,
            position_id: position_id,
            salary: salary,
        };

        const config = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.post("http://localhost:8080/api/signup", userData);
            console.log(response);
        } catch (error) {
            console.log(error.response.data);
            setFormData((prevState) => ({
                ...prevState,
                error_message: error.response.data,
            }));
        }
    };

    return (
        <form onSubmit={onClick}>
            <h2 className="form_title">New Employee Form</h2>
            <div className="form_group">
                <label className="form_label" htmlFor="first_name">
                    Employee Name
                </label>
                <div>
                    <input
                        className="form_field"
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder=" First Name"
                    />
                    <input
                        className="form_field"
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder=" Last Name"
                    />
                </div>
            </div>

            <div className="form_group">
                <label className="form_label">Contact Information</label>
                <div>
                    <input
                        className="form_field"
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder=" Phone Number"
                    />
                    <input
                        className="form_field"
                        type="text"
                        id="personal_email"
                        name="personal_email"
                        value={formData.personal_email}
                        onChange={handleChange}
                        placeholder=" Personal Email"
                    />
                </div>
            </div>
            <div className="form_group">
                <label className="form_label"> Address</label>
                <div>
                    <input
                        className="form_field"
                        type="text"
                        id="street_address"
                        name="street_address"
                        value={formData.street_address}
                        onChange={handleChange}
                        placeholder=" Street"
                    ></input>
                    <input
                        className="form_field"
                        type="text"
                        id="city_address"
                        name="city_address"
                        value={formData.city_address}
                        onChange={handleChange}
                        placeholder=" City"
                    ></input>
                </div>
                <div>
                    <input
                        className="form_field"
                        type="text"
                        id="state_address"
                        name="state_address"
                        value={formData.state_address}
                        onChange={handleChange}
                        placeholder=" State"
                    ></input>
                    <input
                        className="form_field"
                        type="text"
                        id="postal_code_address"
                        name="postal_code_address"
                        value={formData.postal_code_address}
                        onChange={handleChange}
                        placeholder=" Postal Code"
                    ></input>
                </div>
            </div>
            <div className="form_group">
                <label className="form_label">Personal Information</label>
                <div>
                    <input
                        className="form_field"
                        type="text"
                        id="ssn"
                        name="ssn"
                        value={formData.ssn}
                        onChange={handleChange}
                        placeholder=" Social Security Number (xxx-xxx-xxxx)"
                    />
                    <input
                        className="form_field"
                        type="text"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        placeholder=" Birthday (YYYY-MM-DD)"
                    />
                </div>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="username">
                    Account Information
                </label>
                <input
                    className="form_field"
                    type="username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=" Username"
                />
                <div>
                    <input
                        className="form_field"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" Password"
                    />
                    <input
                        className="form_field"
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder=" Confirm Password"
                    />
                </div>
            </div>
            <div className="submit_cancel_error_group">
                <div className="form_group">
                    <button id="add_employee_button" type="submit">
                        Create Employee Profile
                    </button>
                    <button id="cancel_new_employee_button">Cancel</button>
                </div>
                {formData.error_message === "" ? <div></div> : <div id="create_employee_error_message">{formData.error_message}</div>}
            </div>
        </form>
    );
};

export default NewEmployeeForm;
