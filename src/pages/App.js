import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home.js";
import CardImageGallery from "./cardImageGallery/CardImageGallery.js";
import Draft from "./draft/Draft.js";
import NotFound from "./notFound/NotFound.js";
import "./cssreset.css";
import "./App.scss";
import NavBar from "../components/navBar/navBar.js";

export default function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/card-image-gallery" component={CardImageGallery} />
                <Route exact path="/draft" component={Draft} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
}
