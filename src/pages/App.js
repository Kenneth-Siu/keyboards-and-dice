import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import Home from "./home/Home.js";
import CardImageGallery from "./cardImageGallery/CardImageGallery.js";
import Draft from "./draft/Draft.js";
import NotFound from "./notFound/NotFound.js";
import NavBar from "../components/navBar/navBar.js";
import Faq from "./faq/Faq.js";
import Downloads from "./downloads/Downloads.js";
import Login from "./login/Login.js";
import "./cssreset.css";
import "./App.scss";

export default function App({ userDisplayName }) {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/card-image-gallery" component={CardImageGallery} />
                <Route exact path="/faq" component={Faq} />
                <PrivateRoute exact path="/draft" component={Draft} authed={userDisplayName} userDisplayName={userDisplayName} />
                <Route exact path="/downloads" component={Downloads} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
}
