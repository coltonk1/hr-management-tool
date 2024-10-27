import React, { useState } from "react";
import Stats from "../Statistics";
import styles from "../../styles/Widget.module.css";
import calendar_icon from "../../resources/calendar_icon.svg";
import { DataGrid } from "@mui/x-data-grid";

let todaysDate = "10/24";
const employeeTimes = [
    { id: 12, firstName: "Wilber", lastName: "Clonts", clockInTime: "8:00", clockOutTime: "5:15", notes: "" },
    { id: 6, firstName: "Colton", lastName: "Karaffa", clockInTime: "8:30", clockOutTime: "5:30", notes: "" },
    { id: 5, firstName: "Hilton", lastName: "Del Valle", clockInTime: "8:00", clockOutTime: "5:15", notes: "" },
    { id: 1, firstName: "Natalle", lastName: "Myers", clockInTime: "8:00", clockOutTime: "5:15", notes: "" },
];

const AttendanceWidget = () => {
    const [rows, setRows] = useState(employeeTimes);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "firstName", headerName: "First name", width: 130 },
        { field: "lastName", headerName: "Last name", width: 130 },
        { field: "clockInTime", headerName: "Clock in Time", width: 130, editable: true },
        { field: "clockOutTime", headerName: "Clock out Time", width: 130, editable: true },
        { field: "notes", headerName: "Notes", width: 130, editable: true },
    ];

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.widgetTitle}>
                Attendance - {todaysDate} <img src={calendar_icon}></img>
            </div>
            <DataGrid rows={employeeTimes} columns={columns} pageSize={5} rowsPerPageOptions={[5]}></DataGrid>
        </div>
    );
};

export default AttendanceWidget;
