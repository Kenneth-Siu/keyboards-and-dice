import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import TerraHome from "./terra/home/Home.js";
import CardImageGallery from "./terra/cardImageGallery/CardImageGallery.js";
import Drafts from "./terra/drafts/Drafts.js";
import TerraNotFound from "./terra/notFound/NotFound.js";
import TerraNavBar from "../components/navBars/TerraNavBar.js";
import Faq from "./terra/faq/Faq.js";
import TerraDownloads from "./terra/downloads/Downloads.js";
import Login from "./terra/login/Login.js";
import "./cssreset.css";
import "./App.scss";
import Draft from "./terra/draft2/Draft.js";
import Rankings from "./terra/rankings/Rankings.js";
import PrintAndPlay from "./terra/printAndPlay/PrintAndPlay.js";
import MainNavBar from "../components/navBars/MainNavBar.js";
import SmallMainNavBar from "../components/navBars/SmallMainNavBar.js";
import Home from "./home/Home.js";
import NotFound from "./notFound/NotFound.js";
import Darkham from "./darkham/Darkham.js";
import DarkhamDownloads from "./darkham/downloads/Downloads.js";

export default function App({ loggedInUser }) {
    return (
        <>
            <Switch>
                <Route exact path="/terra/print-and-play" component={PrintAndPlay} />
                <Route path="/terra">
                    {SmallMainNavBar()}
                    {TerraNavBar()}
                    <Switch>
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
                        <Route exact path="/terra/downloads" component={TerraDownloads} />
                        <Route exact path="/terra/rankings" component={Rankings} />
                        <Route exact path="/terra/login" component={Login} />
                        <Route exact path="/terra" component={TerraHome} />
                        <Route path="/terra" component={TerraNotFound} />
                    </Switch>
                </Route>
                <Route path="/">
                    {MainNavBar()}
                    <Switch>
                        <Route exact path="/darkham/downloads" component={DarkhamDownloads} />
                        <Route exact path="/darkham" component={Darkham} />
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </Route>
            </Switch>
        </>
    );
}
