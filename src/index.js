import React from "react";
import { Profiler } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <div id="back"></div>
    <App />
  </div>
);
