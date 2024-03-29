import React from "react";
import { Route, Switch } from "react-router-dom";
import StcHome from "./stc/home/Home.js";
import CardImageGallery from "./stc/cardImageGallery/CardImageGallery.js";
import StcNotFound from "./stc/notFound/NotFound.js";
import StcNavBar from "../components/navBars/StcNavBar.js";
import Faq from "./stc/faq/Faq.js";
import StcDownloads from "./stc/downloads/Downloads.js";
import "./cssreset.css";
import "./App.scss";
import Rankings from "./stc/rankings/Rankings.js";
import Archetypes from "./stc/archetypes/Archetypes.js";
import PrintAndPlay from "./stc/printAndPlay/PrintAndPlay.js";
import MainNavBar from "../components/navBars/MainNavBar.js";
import SmallMainNavBar from "../components/navBars/SmallMainNavBar.js";
import Home from "./home/Home.js";
import NotFound from "./notFound/NotFound.js";
import Darkham from "./darkham/Darkham.js";
import DarkhamDownloads from "./darkham/downloads/Downloads.js";
import DarkhamCardImageGallery from "./darkham/cardImageGallery/CardImageGallery.js";
import DarkhamPrintAndPlayScenario from "./darkham/printAndPlay/PrintAndPlayScenario.js";
import DarkhamPrintAndPlayPlayer from "./darkham/printAndPlay/PrintAndPlayPlayer.js";

export default function App() {
    return (
        <>
            <Switch>
                <Route exact path="/stc/print-and-play" component={PrintAndPlay} />
                <Route exact path="/darkham/print-and-play-scenario" component={DarkhamPrintAndPlayScenario} />
                <Route exact path="/darkham/print-and-play-player" component={DarkhamPrintAndPlayPlayer} />
                <Route path="/stc">
                    {SmallMainNavBar()}
                    {StcNavBar()}
                    <Switch>
                        <Route exact path="/stc/card-image-gallery" component={CardImageGallery} />
                        <Route exact path="/stc/faq" component={Faq} />
                        <Route exact path="/stc/downloads" component={StcDownloads} />
                        <Route exact path="/stc/rankings" component={Rankings} />
                        <Route exact path="/stc/archetypes" component={Archetypes} />
                        <Route exact path="/stc" component={StcHome} />
                        <Route path="/stc" component={StcNotFound} />
                    </Switch>
                </Route>
                <Route path="/">
                    {MainNavBar()}
                    <Switch>
                        <Route exact path="/darkham/card-image-gallery" component={DarkhamCardImageGallery} />
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
