import React from "react";
import "./Downloads.scss";
import downloadsSplash from "../../../../../data/Darkham/downloadsSplash.jpg";
import darkhamSave from "../../../../../data/Darkham/DarkhamHorror/DarkhamHorror.zip";

export default function Downloads() {
    return (
        <>
            <title>Darkham Horror Downloads · Keyboards &amp; Dice</title>
            <main className="darkham-downloads-page">
                <div className="background-image-container">
                    <img className="background-image" src={downloadsSplash} />
                </div>
                <div className="container">
                    <h1>Darkham Horror Downloads</h1>
                    <h2>Play on Tabletop Simulator</h2>
                    <p>
                        You should already have installed{" "}
                        <a href="https://www.tabletopsimulator.com/">Tabletop Simulator</a> on Steam, and the Arkham Super
                        Complete Edition mod (no longer available on Steam Workshop).
                    </p>
                    <ol>
                        <li>
                            Install the mod <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2560750339">from here</a>, and follow the instructions.
                        </li>
                        <li>
                            That's it. Enjoy!
                        </li>
                    </ol>
                </div>
            </main>
        </>
    );
}
