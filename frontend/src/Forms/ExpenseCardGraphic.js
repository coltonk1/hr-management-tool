import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forms.css";

const ExpenseCardGraphic = ({ cardNumber, expirationDate, cardholder }) => {
    return (
        <div id="credit_card_graphic">
            <div id="expense_card_graphic_card_number">
                {cardNumber.substring(0, 4) +
                    " " +
                    cardNumber.substring(4, 8) +
                    " " +
                    cardNumber.substring(8, 12) +
                    " " +
                    cardNumber.substring(12, 16)}
            </div>
            <div id="expense_card_graphic_expiration">
                <div id="valid_thru">Valid Thru</div> {expirationDate}
            </div>
            <div id="cardholder">{cardholder.split(" ")[3] + " " + cardholder.split(" ")[4]}</div>

            <svg id="card_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="90" height="40">
                <circle cx="75" cy="50" r="40" fill="red" />
                <circle cx="125" cy="50" r="40" fill="orange" fill-opacity="0.9" />
            </svg>
            <div id="card_company_name">Code-Hub Co.</div>
        </div>
    );
};

export default ExpenseCardGraphic;
