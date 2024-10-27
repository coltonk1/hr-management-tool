import logo from "./logo.svg";
import "./App.css";
import TestButton from "./TestButton";
import NewEmployeeForm from "./Forms/NewEmployeeForm";
import NewExpenseForm from "./Forms/NewExpenseForm";
import NewExpenseCardForm from "./Forms/NewExpenseCardForm";

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
                                <Link to={"/contact"}>Contact</Link>
                            </li>
                            <li>
                                <Link to={"/about"}>About</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="right-side">
                    <p>Profile Stuff</p>
                </div>
            </header>
            <Outlet></Outlet>
            <NewEmployeeForm />
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default App;
