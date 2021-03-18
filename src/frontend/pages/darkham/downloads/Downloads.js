import React from "react";
import "./Downloads.scss";
import downloadsSplash from "../../../../../data/Darkham/downloadsSplash.jpg";

export default function Downloads() {
    return (
        <>
            <title>Darkham Horror Downloads · Keyboards &amp; Dice</title>
            <main className="downloads-page">
                <div className="background-image-container">
                    <img className="background-image" src={downloadsSplash} />
                </div>
                <div className="container">
                    <h1>Darkham Horror Downloads</h1>
                    <h2>Play on Tabletop Simulator</h2>
                    <p>
                        You should already have installed{" "}
                        <a href="https://www.tabletopsimulator.com/">Tabletop Simulator</a> and the Arkham Super
                        Complete Edition mod (no longer available on Steam Workshop).
                    </p>
                    <ol>
                        <li>
                            Sorry, WIP!
                        </li>
                    </ol>
                </div>
            </main>
        </>
    );
}
