import logo from "./logo.svg";
import "./App.css";
import TestButton from "./TestButton";
import NewEmployeeForm from "./Forms/NewEmployeeForm";
import NewExpenseForm from "./Forms/NewExpenseForm";
import NewExpenseCardForm from "./Forms/NewExpenseCardForm";
import Cookies from "js-cookie";

import { Outlet, Link } from "react-router-dom";
import logoSrc from "./logo.png";

function App() {
    return (
        <div>
            <header>
                <div className="left-side">
                    <Link to="/home" className="logo-container">
                        <img src={logoSrc}></img>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to={"/home"}>Home</Link>
                            </li>
                            <li>
                                <Link to={"/pricing"}>Pricing</Link>
                            </li>
                            <li>
                                <Link to={"/about"}>About</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="right-side">
                    <nav>
                        {Cookies.get("token") ? (
                            <ul>
                                <li>
                                    <Link to={"/dashboard"}>Dashboard</Link>
                                </li>
                                <li className="profile-menu">
                                    <img src="https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"></img>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <Link to={"/login"}>Login</Link>
                                </li>
                                <li>
                                    <Link to={"/signup"} className="signup-button">
                                        Signup
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </header>
            <Outlet></Outlet>
            {/* <NewEmployeeForm /> */}
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default App;
