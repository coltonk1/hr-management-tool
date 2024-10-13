import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import App from "./App";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route element={<Home />} />
                        <Route path="/dashboard/login" element={<Login />} />
                        <Route path="/dashboard/signup" element={<Signup />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>
);
