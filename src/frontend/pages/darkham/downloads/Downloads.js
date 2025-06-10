import React from "react";
import "./Downloads.scss";
import darkhamSplash from "../../../../../data/Darkham/darkhamSplash.jpg";
import { Link } from "react-router-dom";

export default function Downloads() {
    return (
        <>
            <title>Downloads · Darkham Horror · Keyboards &amp; Dice</title>
            <main className="darkham-downloads-page">
                <div className="background-image-container">
                    <img className="background-image" src={darkhamSplash} />
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
                                    href="https://steamcommunity.com/sharedfiles/filedetails/?id=2560750339"
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
                        <p>You can also print out the cards and play in person. These PDFs are sized for printing in A4 or Letter.</p>
                        <ol>
                            <li>
                                The{" "}
                                <a
                                    href="https://kenneth-siu.github.io/darkham-horror-card-images/Darkham%20Horror%20Campaign%20Guide.pdf"
                                    target="_blank"
                                >
                                    campaign guide
                                </a>
                                .
                            </li>
                            <li>
                                The{" "}
                                <a
                                    href="https://kenneth-siu.github.io/darkham-horror-card-images/DarkhamHorrorPlayerCards.pdf"
                                    target="_blank"
                                >
                                    investigator cards
                                </a>
                                .
                            </li>
                            <li>
                                The{" "}
                                <a
                                    href="https://kenneth-siu.github.io/darkham-horror-card-images/DarkhamHorrorCampaignCards.pdf"
                                    target="_blank"
                                >
                                    campaign cards
                                </a>
                                .<em> (Warning! It's a big file ~ 50MB!)</em>
                            </li>
                        </ol>
                        <blockquote>
                            Don't want to print in A4 or Letter? Know a bit of CSS and want to adjust the image spacing
                            or the background color? You can also print directly from your browser.
                            <ol>
                                <li>
                                    Click on the links for:{" "}
                                    <Link to="/darkham/print-and-play-player" target="_blank">
                                        the investigator cards
                                    </Link>{" "}
                                    and the{" "}
                                    <Link to="/darkham/print-and-play-scenario" target="_blank">
                                        campaign cards
                                    </Link>
                                    .{" "}
                                    <em>
                                        (Warning! There are a lot of images to load. Check your browser has loaded them
                                        all before printing.)
                                    </em>
                                </li>
                                <li>Use your browser's print dialog and check a few things:</li>
                                <li>
                                    The cards should already be sized to fit inside a sleeve in front of an{" "}
                                    <em>Arkham Horror: The Card Game</em> card, so check that scaling is set to 100%.
                                    Your sleeves and setup may differ though, so consider printing out a page now as a
                                    test run.
                                </li>
                                <li>Adjust your margins to fit a good number of cards on each page.</li>
                                <li>
                                    Once you've printed out the cards, cut them out and sleeve them up in front of
                                    actual cards.
                                </li>
                            </ol>
                        </blockquote>
                    </section>
                </div>
            </main >
        </>
    );
}
