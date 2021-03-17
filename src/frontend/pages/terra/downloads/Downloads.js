import React from "react";
import "./Downloads.scss";
import cockatriceXml from "../../../../../data/terra2170.xml";
import downloadsSplash from "../../../../../data/downloadsSplash.jpg";

export default function Downloads() {
    return (
        <>
            <title>Downloads · Terra 2170</title>
            <main className="downloads-page">
                <div className="background-image-container">
                    <img className="background-image" src={downloadsSplash} />
                </div>
                <div className="container">
                    <h1>Downloads</h1>
                    <h2>Play on Cockatrice</h2>
                    <p>
                        You should already have installed <a href="https://cockatrice.github.io/">Cockatrice</a>, and
                        run through its first time setup.
                    </p>
                    <ol>
                        <li>
                            Right-click <a href={cockatriceXml}>this link</a> and select "Save link as..." and save it
                            anywhere you like.
                        </li>
                        <li>Open Cockatrice.</li>
                        <li>
                            In the menu at the top, go to{" "}
                            <span className="mono-space">Card Database &gt; Add custom sets/cards</span>.
                        </li>
                        <li>Select the file you downloaded earlier and click "Open".</li>
                        <li>Restart Cockatrice.</li>
                        <li>
                            (You can delete the file you downloaded earlier if you like. You don't need it any more.)
                        </li>
                    </ol>
                </div>
            </main>
        </>
    );
}
