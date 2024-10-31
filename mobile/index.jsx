import "../global.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { LogInScreen } from "./src/LogInScreen.jsx";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<LogInScreen />);
