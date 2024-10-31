import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Main.module.css";
import event_styles from "../styles/Events.module.css";
import "../styles/test.css";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function filterByDayMonthYear(day, month, year, information) {
    return information.filter((item) => item.day === day && item.month === month && item.year === year);
}

function get_info(day, month, year, information) {
    return filterByDayMonthYear(day, month, year, information).map((item) => {
        return (
            <div>
                {item.title} + {item.description}
            </div>
        );
    });
}

class Day extends React.Component {
    render() {
        return (
            <div
                className={"day " + this.props.event}
                id={this.props.day}
                onClick={() => {
                    // console.log(get_info(this.props.day, this.props.month, this.props.year, this.props.information));
                }}
            >
                {this.props.day}
            </div>
        );
    }
}

class EmptyDay extends React.Component {
    render() {
        return <div className="emptyday">{this.props.day}</div>;
    }
}

class Row extends React.Component {
    render() {
        return <div className="row">{this.props.value}</div>;
    }
}

class Calendar extends React.Component {
    // ! I tried going back and modifying the 2 year old code of this. However, I believe it would be best to redo the majority of the code here.
    constructor(props) {
        super(props);
        this.state = { month: 0, year: new Date().getFullYear() };

        this.change_month = this.change_month.bind(this);
        this.check_mouse = this.check_mouse.bind(this);
    }

    componentDidMount() {
        this.setState({ month: new Date().getMonth().toString() });
    }

    change_month(amount) {
        this.setState({ month: parseInt(this.state.month) + amount });
    }

    render_days(month, year) {
        // ! I feel like this method could be so much easier if #days_container was just a grid instead, then no need for rows and can just push every day until there are 6*7 days. new Date(year, month, index).getDate() where index starts at -new Date(year,month,1).getDay(), and goes until 6*7 - new Date(year,month,1).getDay(), then if index is < 1 then its the last month, and if its > new Date(year,month+1,0) then we know its the next month. Would probably be ~20 lines instead of however many this is (50?). Let the days component handle month and year overflows.
        const rows = [];
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOffset = firstDayOfMonth.getDay();
        let missed = 0;
        let index = 0;

        const isToday = (day) => day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        const hasEvent = (day) => this.props.information.some((e) => e.day === day && e.month === month && e.year === year);

        var b = 0;
        for (let a = 0; a * 7 + b - firstDayOffset + 1 <= lastDayOfMonth; a++) {
            const days = [];
            for (var b = 0; b < 7; b++) {
                const day = a * 7 + b - firstDayOffset + 1;
                if (day < 1) {
                    // Days from the previous month
                    days.push(<EmptyDay key={`empty-${b}`} day={day + new Date(year, month, 0).getDate()} />);
                    missed++;
                } else if (day <= lastDayOfMonth) {
                    let event = hasEvent(day) ? " ev" : "";
                    event += isToday(day) ? " today" : "";
                    days.push(<Day key={day} day={day} month={month} year={year} event={event} />);
                    index = day;
                }
            }
            rows.push(<Row key={`row-${a}`} value={days} />);
        }

        // Handle remaining days after the last full row
        if (index <= lastDayOfMonth) {
            const days = [];
            for (let i = index + 1; i <= lastDayOfMonth; i++) {
                let event = hasEvent(i) ? " ev" : "";
                days.push(<Day key={i} day={i} month={month} year={year} event={event} />);
                index = i;
            }
            for (let i = 0; i < 7 - ((index + missed - 1) % 7) - 1; i++) {
                days.push(<EmptyDay key={`fill-${i}`} day={i + 1} />);
            }
            rows.push(<Row value={days} />);
        }

        if (rows.length < 6) {
            var days = [];
            for (var i = 7 - ((index + missed - 1) % 7) - 1; i < 7 - ((index + missed - 1) % 7) + 7 - 1; i++) {
                days.push(<EmptyDay day={i + 1} />);
            }
            rows.push(<Row value={days} />);
        }

        return rows;
    }

    check_mouse(button, amount) {
        var still_over = true;
        window.addEventListener("mouseup", () => {
            still_over = false;
        });
        setTimeout(() => {
            var const_int = setInterval(() => {
                if (still_over) this.change_month(amount);
                else clearInterval(const_int);
            }, 250);
        }, 1000);
    }

    render() {
        return (
            <div id="main_container">
                <div id="calendar_container">
                    <div id="calendar-header">
                        <h1 style={{ color: "#303035" }}>
                            {monthNames[new Date(this.state.year, this.state.month, 1).getMonth()]}{" "}
                            {this.state.year + Math.floor(this.state.month / 12)}
                        </h1>
                        <input
                            id="left_button"
                            onMouseDown={() => {
                                this.change_month(-1);
                                this.check_mouse("left_button", -1);
                            }}
                            type="button"
                            defaultValue="<"
                        />
                        <input
                            id="right_button"
                            type="button"
                            defaultValue=">"
                            onMouseDown={() => {
                                this.change_month(1);
                                this.check_mouse("right_button", 1);
                            }}
                        />
                    </div>
                    <div className={styles.smallMargin}>Margin</div>
                    {/* <h2>{new Date().toLocaleString("en-US", { weekday: "long", month: "long", day: "2-digit", year: "numeric" })}</h2> */}
                    <div id="day_titles">
                        <h2>S</h2>
                        <h2>M</h2>
                        <h2>T</h2>
                        <h2>W</h2>
                        <h2>T</h2>
                        <h2>F</h2>
                        <h2>S</h2>
                    </div>
                    <div
                        id="days_container"
                        onMouseMove={(e) => {
                            document.getElementById("circle").style.opacity = 1;
                            const circle = document.getElementById("circle");
                            const rect = document.getElementById("days_container").getBoundingClientRect();
                            const x = e.clientX - rect.left - circle.clientWidth / 2;
                            const y = e.clientY - rect.top - circle.clientHeight / 2;
                            circle.style.left = `${x}px`;
                            circle.style.top = `${y}px`;
                        }}
                        onMouseLeave={() => {
                            document.getElementById("circle").style.opacity = 0;
                        }}
                    >
                        <div id="circle"></div>
                        {this.render_days(parseInt(this.state.month), parseInt(this.state.year))}
                    </div>
                </div>
            </div>
        );
    }
}

const ExpandedDay = ({ day, month, year, current_month = true, information }) => {
    const date = new Date(year, month, day);
    const current_date = new Date();
    const isToday = (date_) =>
        date_.getDate() === current_date.getDate() &&
        date_.getMonth() === current_date.getMonth() &&
        date_.getFullYear() === current_date.getFullYear();

    function convertToMinutes(timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    }

    function convertToTimeString(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        // Convert to 12-hour format
        const adjustedHours = hours % 12 || 12; // Convert 0 hours to 12 for AM/PM
        const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM

        // Format hours and minutes to ensure two digits for minutes
        const formattedMinutes = String(mins).padStart(2, "0");

        return `${adjustedHours}:${formattedMinutes} ${period}`;
    }

    function filterByDate(arr, year, month, date) {
        return arr.filter((item) => {
            return item.year === year && item.month === month && item.day == date;
        });
    }

    return (
        <div className={(current_month ? "" : event_styles.not_current + " ") + (isToday(date) ? event_styles.current_day : "")}>
            <p className={event_styles.expanded_date}>{date.getDate()}</p>
            {information &&
                filterByDate(information, date.getFullYear(), date.getMonth(), date.getDate()).map((data) => {
                    return (
                        <div style={{ borderTop: `2px solid ${data.color}`, borderLeft: `2px solid ${data.color}` }}>
                            {/* {convertToTimeString(data.from)} - {convertToTimeString(data.to)} */}
                            {data.title}
                        </div>
                    );
                })}
        </div>
    );
};

const ExpandedCalendar = ({ month, year, information }) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDay = firstDayOfMonth.getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = -firstDay + 1; i <= 6 * 7 - firstDay; i++)
        days.push(<ExpandedDay year={year} month={month} day={i} current_month={i > 0 && i <= lastDayOfMonth} information={information} />);

    return <div className={event_styles.expanded_month}>{days}</div>;
};

const Events = () => {
    const [month, setMonth] = useState(9);
    const [year, setYear] = useState(2024);
    const [information, setInformation] = useState([]);

    useEffect(() => {
        fetchInformation(month, year);
    }, [month, year]);

    const fetchInformation = async () => {
        const result = [
            {
                day: 13,
                month: 9,
                year: 2024,
                title: "Do something",
                description: "",
                color: "red",
                from: 540,
                to: 1020,
            },
            {
                day: 14,
                month: 9,
                year: 2024,
                title: "Talk to Wilber",
                description: "Talk to that weirdo today",
                color: "blue",
                from: 480,
                to: 600,
            },
            {
                day: 14,
                month: 9,
                year: 2024,
                title: "Talk to Wilber",
                description: "Talk to that weirdo today",
                color: "green",
                from: 480,
                to: 600,
            },
            {
                day: 30,
                month: 8,
                year: 2024,
                title: "Talk to Myself",
                description: "Talk to that weirdo today",
                color: "magenta",
                from: 480,
                to: 600,
            },
        ];
        setInformation(result);
    };

    return (
        <div>
            <section>
                <div className={styles.customSplit}>
                    <ExpandedCalendar month={month} year={year} information={information} />
                    <div className={event_styles.calendarSide}>
                        <div className={styles.smallMargin}>Margin</div>
                        <Calendar month={month} year={year} information={information} />
                        <div className={styles.smallMargin}>Margin</div>
                        <title style={{ color: "#303035" }}>Lapsed</title>
                        <div className={styles.smallMargin}>Margin</div>
                        <div className={styles.smallMargin}>Margin</div>
                        <title style={{ color: "#303035" }}>Upcoming</title>
                        <div className={styles.smallMargin}>Margin</div>
                        <div className={styles.smallMargin}>Margin</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;