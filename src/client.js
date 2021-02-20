import App from "./frontend/pages/App.js";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";

const userDisplayName = document.currentScript.getAttribute("user-display-name");

hydrate(
    <BrowserRouter>
        <App userDisplayName={userDisplayName} />
    </BrowserRouter>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}
