import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Bank from "./components/Bank";
import Stats from "./components/Statistics";
import Support from "./components/Support";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/support" element={<Support />} />

                    <Route path="/:businessid/stats" element={<Stats />} />
                    <Route path="/:businessid/bank" element={<Bank />} />

                    <Route path="*" element={<NotFound />} />
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
