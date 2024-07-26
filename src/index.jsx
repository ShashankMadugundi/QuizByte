import React from "react"
import ReactDom from "react-dom"
import App from "./compenents/App";
import Home from "./compenents/home";
import { createRoot } from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDom.render(<div><Home /></div>, document.getElementById("root"));

createRoot( document.getElementById("root")).render(<div><Home /></div>);