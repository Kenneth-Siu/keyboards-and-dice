import React from "react";
import "./Downloads.scss";
import twoaSplash from "../../../../../data/twoa/twoaSplash.jpg";
import { Link } from "react-router-dom";

export default function Downloads() {
    return (
        <>
            <title>Downloads · The Worlds of Android · Keyboards &amp; Dice</title>
            <main className="twoa-downloads-page">
                <div className="background-image-container">
                    <img className="background-image" src={twoaSplash} />
                </div>
                <div className="content">
                    <section>
                        <h1>Play on Tabletop Simulator</h1>
                        <p>
                            You should already have installed{" "}
                            <a href="https://www.tabletopsimulator.com/"><em>Tabletop Simulator</em></a> on Steam, and the <em>Arkham
                                Super Complete Edition</em> mod (no longer available on <em>Steam Workshop</em>).
                        </p>
                        <ol>
                            <li>
                                Subscribe to the mod{" "}
                                <a
                                    href="https://steamcommunity.com/sharedfiles/filedetails/?id=3444571431"
                                    target="_blank"
                                >
                                    from here
                                </a>
                                , and follow the instructions there.
                            </li>
                            <li>That's it. Enjoy!</li>
                        </ol>
                    </section>
                    <section>
                        <h1>Print and Play</h1>
                        <p>Coming soon, once it's out of beta.</p>                        
                    </section>
                </div>
            </main >
        </>
    );
}
