import logo from "./logo.svg";
import "./App.css";
import TestButton from "./TestButton";
import NewEmployeeForm from "./Forms/NewEmployeeForm";
import NewExpenseForm from "./Forms/NewExpenseForm";
import NewExpenseCardForm from "./Forms/NewExpenseCardForm";
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div>
            <header>
                <div className="left-side">
                    <p>Left Side</p>
                </div>
                <div className="right-side">
                    <p>Right Side</p>
                </div>
            </header>
            <Outlet />
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default App;
