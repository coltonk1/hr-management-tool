import logo from "./logo.svg";
import "./App.css";
import TestButton from "./TestButton";
import NewEmployeeForm from "./Forms/NewEmployeeForm";
import NewExpenseForm from "./Forms/NewExpenseForm";
import NewExpenseCardForm from "./Forms/NewExpenseCardForm";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <NewExpenseForm />
                <NewEmployeeForm />
            </header>
        </div>
    );
}

export default App;
