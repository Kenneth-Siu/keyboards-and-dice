import React from "react";
import { Route, Switch } from "react-router-dom";
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

export default function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/card-image-gallery" component={CardImageGallery} />
                <Route exact path="/faq" component={Faq} />
                <Route exact path="/draft" component={Draft} />
                <Route exact path="/downloads" component={Downloads} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
}
