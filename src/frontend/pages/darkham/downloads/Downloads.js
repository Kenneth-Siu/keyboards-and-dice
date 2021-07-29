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
                        <a href="https://www.tabletopsimulator.com/">Tabletop Simulator</a> and the Arkham Super
                        Complete Edition mod (no longer available on Steam Workshop).
                    </p>
                    <ol>
                        <li>
                            Find your Tabletop Simulator saved objects folder.
                        </li>
                        <blockquote>
                            It is likely to be: <span className="mono-space">Documents / My Games / Tabletop Simulator / 
                            Saves / Saved Objects</span>
                        </blockquote>
                        <li>
                            Click <a href={darkhamSave} download>this link</a>, and save it anywhere you like.
                        </li>
                        <li>
                            Extract its contents into the Tabletop Simulator saved objects folder. There should be two files: 
                            "Darkham Horror.json" and "Darkham Horror.jpg".
                        </li>
                        <li>
                            Start Tabletop Simulator and load the Arkham Super Complete Edition mod.
                        </li>
                        <li>
                            Click "Objects" at the top of your screen, then "Saved Objects" in the window that opens.
                        </li>
                        <li>
                            Click-and-drag the saved object called "Darkham Horror" onto the table.
                        </li>
                        <li>
                            You're done! Everything you should need is inside this box, from player cards to scenarios.
                        </li>
                    </ol>
                </div>
            </main>
        </>
    );
}
