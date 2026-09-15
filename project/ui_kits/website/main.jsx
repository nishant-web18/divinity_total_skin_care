import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";

const host = document.getElementById("root");
host.textContent = "";
ReactDOM.createRoot(host).render(React.createElement(App));
