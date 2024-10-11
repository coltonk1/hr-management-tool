import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forms.css";

// Functional Button component
const NewExpenseForm = () => {
    const [formData, setFormData] = useState({
        expense_name: "",
        expense_date: "today",
        expense_category: "",
        expense_amount: "",
        expense_description: "",
        employee_id: "",
        expense_card_id: "",
        error_message: "",
    });
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/get_all_users");

                let names = response.data.map((person, index) => "EID: " + index + " - " + person.firstName + " " + person.lastName);

                setSelectedOptions(names);

                console.log(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        };
        fetchData();
    }, []);

    const onClick = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior (reloading)
        console.log("Form Data:", formData); // Here you can send the formData to a server via an API call

        const userData = {
            expense_name: formData.expense_name,
            expense_date: formData.expense_date,
            expense_category: formData.expense_category,
            expense_amount: formData.expense_amount,
            expense_description: formData.expense_description,
            employee_id: 1,
            expense_card_id: formData.expense_card_id,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/create_new_expense", userData);
            console.log(response);
        } catch (error) {
            console.error("Error fetching data:", error.response.data);
            setFormData((prevState) => ({
                ...prevState,
                error_message: error.response.data,
            }));
        }
    };

    return (
        <form onSubmit={onClick}>
            <h2 className="form_title">New Expense Form</h2>
            <div className="form_group">
                <label className="form_label" htmlFor="first_name">
                    Expense Information
                </label>
                <div>
                    <input
                        className="form_field"
                        type="text"
                        id="expense_name"
                        name="expense_name"
                        value={formData.expense_name}
                        onChange={handleChange}
                        placeholder=" Expense Name"
                    />
                    <input
                        className="form_field"
                        type="text"
                        id="expense_date"
                        name="expense_date"
                        value={formData.expense_date}
                        onChange={handleChange}
                        placeholder=" Expense Date (mm-dd-yyyy)"
                    />
                </div>
                <div>
                    <select
                        className="form_field"
                        type="text"
                        id="expense_category"
                        name="expense_category"
                        value={formData.expense_category}
                        onChange={handleChange}
                        placeholder=" Expense Category"
                    >
                        <option value="travel">Travel</option>
                        <option value="driving">Driving</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        className="form_field"
                        type="text"
                        id="expense_amount"
                        name="expense_amount"
                        value={formData.expense_amount}
                        onChange={handleChange}
                        placeholder=" Expense Amount"
                    ></input>
                </div>
                <textarea
                    className="expense_descirption"
                    type="text"
                    id="expense_description"
                    name="expense_description"
                    value={formData.expense_description}
                    onChange={handleChange}
                    placeholder="Expense Description"
                ></textarea>
            </div>
            <div className="form_group">
                <label className="form_label">Employee Information</label>
                <div>
                    <select
                        className="form_field"
                        type="text"
                        id="employee_id"
                        name="employee_id"
                        value={selectedOptions}
                        onChange={handleChange}
                        placeholder="Expnese Category"
                    >
                        <option value="" disabled selected>
                            Employee Name
                        </option>
                        {selectedOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <input
                        className="form_field"
                        type="text"
                        id="expense_card_id"
                        name="expense_card_id"
                        value={formData.expense_card_id}
                        onChange={handleChange}
                        placeholder=" Expense Card Number"
                    ></input>
                </div>
            </div>
            <div className="submit_cancel_error_group">
                <div className="form_group">
                    <button id="add_expense_button" type="submit">
                        Create New Expense
                    </button>
                    <button id="cancel_new_expense_button">Cancel</button>
                </div>
                {formData.error_message === "" ? <div></div> : <div id="create_employee_error_message">{formData.error_message}</div>}
            </div>
        </form>
    );
};

export default NewExpenseForm;
