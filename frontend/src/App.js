import { Outlet } from "react-router-dom";
import "./App.css";

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
