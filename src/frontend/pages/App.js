import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import Home from "./terra/home/Home.js";
import CardImageGallery from "./terra/cardImageGallery/CardImageGallery.js";
import Drafts from "./terra/drafts/Drafts.js";
import NotFound from "./notFound/NotFound.js";
import TerraNavBar from "../components/navBars/TerraNavBar.js";
import Faq from "./terra/faq/Faq.js";
import Downloads from "./terra/downloads/Downloads.js";
import Login from "./login/Login.js";
import "./cssreset.css";
import "./App.scss";
import Draft from "./terra/draft/Draft.js";
import Rankings from "./terra/rankings/Rankings.js";

export default function App({ loggedInUser }) {
    return (
        <>
            <TerraNavBar />
            <Switch>
                <Route exact path="/terra" component={Home} />
                <Route exact path="/terra/card-image-gallery" component={CardImageGallery} />
                <Route exact path="/terra/faq" component={Faq} />
                <PrivateRoute
                    exact
                    path="/terra/drafts"
                    component={Drafts}
                    authed={!!loggedInUser}
                    loggedInUser={loggedInUser}
                />
                <PrivateRoute
                    exact
                    path="/terra/drafts/:draftId"
                    component={Draft}
                    authed={!!loggedInUser}
                    loggedInUser={loggedInUser}
                />
                <Route exact path="/terra/downloads" component={Downloads} />
                <Route exact path="/terra/rankings" component={Rankings} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
}
