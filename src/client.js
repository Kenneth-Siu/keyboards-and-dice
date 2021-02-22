import App from "./frontend/pages/App.js";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";

hydrate(
    <BrowserRouter>
        <App loggedInUser={getLoggedInUser()} />
    </BrowserRouter>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}

function getLoggedInUser() {
    const userId = document.currentScript.getAttribute("user-id");
    const userDisplayName = document.currentScript.getAttribute("user-display-name");
    if (userId && userDisplayName) {
        return {
            id: userId,
            displayName: userDisplayName
        }
    }
    return null;
}
