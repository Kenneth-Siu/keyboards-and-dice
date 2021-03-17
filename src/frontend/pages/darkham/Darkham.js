import * as React from "react";
import darkhamSplash from "../../../../data/darkhamSplash.jpg";
import "./Darkham.scss";

export default function Darkham() {
    return (
        <>
            <title>Darkham Horror · Keyboards &amp; Dice</title>
            <main className="darkham-page">
                <div className="background-image-container">
                    <img className="background-image" src={darkhamSplash} />
                </div>
                <div className="container">
                    <h1>Darkham Horror</h1>
                    <p>
                        <a href="#">ᐳ Download for TTS (WIP)</a>
                    </p>
                </div>
            </main>
        </>
    );
}
