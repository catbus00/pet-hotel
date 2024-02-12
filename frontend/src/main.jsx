import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DOMAIN, PORT } from "./env.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App uri={`${DOMAIN}:${PORT}`} />
  </React.StrictMode>,
);
