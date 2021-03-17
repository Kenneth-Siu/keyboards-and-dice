import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cardImageGallerySplash from "../../../../../data/cardImageGallerySplash.jpg";
import draftSplash from "../../../../../data/draftSplash.jpg";
import rulesFaqSplash from "../../../../../data/rulesFaqSplash.jpg";
import downloadsSplash from "../../../../../data/downloadsSplash.jpg";
import karnSplash from "../../../../../data/karnSplash.jpg";
import "./Home.scss";
import CardImage from "../../../components/cardImages/MagicCardImage";
import timeParadox from "../../../../../data/cardImages/Time Paradox.jpg";
import kushakResearchCouncil from "../../../../../data/cardImages/Kushak Research Council.jpg";
import shadowlightInfiltrator from "../../../../../data/cardImages/Shadowlight Infiltrator.jpg";
import acquisitorDelwani from "../../../../../data/cardImages/Acquisitor Delwani.jpg";
import { getRandomKarnFlavorText } from "./karnFlavorTexts.js";

export default function TerraHome() {
    const [karnQuotation, setKarnQuotation] = useState();
    useEffect(() => {
        setKarnQuotation(getRandomKarnFlavorText());
    }, []);
    return (
        <>
            <title>Terra 2170</title>
            <main className="terra-home-page">
                <section className="mechanics">
                    <img className="background-image" src={cardImageGallerySplash} />
                    <div className="content">
                        <h1>The Future is Now</h1>
                        <div className="two-column">
                            <p>
                                Apply cutting-edge technological advances to your planeswalker duels. Command armies,
                                discover alien secrets, and make backroom dealings in a futuristic vision of Earth.
                            </p>
                            <p>
                                <Link to="/terra/card-image-gallery">ᐳ View the cards</Link>
                            </p>
                        </div>
                        <div className="mechanics-showcase">
                            <figure>
                                <CardImage imageName={timeParadox} />
                                <figcaption>New Mechanic: Teleport</figcaption>
                            </figure>
                            <figure>
                                <CardImage imageName={kushakResearchCouncil} />
                                <figcaption>New Mechanic: Reconstitute</figcaption>
                            </figure>
                            <figure>
                                <CardImage imageName={shadowlightInfiltrator} />
                                <figcaption>New Mechanic: Infiltrate</figcaption>
                            </figure>
                            <figure>
                                <CardImage imageName={acquisitorDelwani} />
                                <figcaption>New Mechanic: Arm</figcaption>
                            </figure>
                        </div>
                    </div>
                </section>
                <section className="draft">
                    <img className="background-image" src={draftSplash} />
                    <div className="content">
                        <h1>Draft in your browser</h1>
                        <p>
                            Grab some friends and draft <em>Terra 2170</em> in your browser!
                        </p>
                        <p>Don't have eight people? No problem, fill in the missing places with bots.</p>
                        <p className="draft-link">
                            <Link to="/terra/drafts">ᐳ Draft now</Link>
                        </p>
                    </div>
                </section>
                <section className="faq">
                    <img className="background-image" src={rulesFaqSplash} />
                    <div className="content">
                        <h1>Rules FAQ</h1>
                        <p>Frequently asked rules questions about both the new mechanics and cards in the set.</p>
                        <p className="faq-link">
                            <Link to="/terra/faq">ᐳ Find out more</Link>
                        </p>
                    </div>
                </section>
                <section className="downloads">
                    <img className="background-image" src={downloadsSplash} />
                    <div className="content">
                        <h1>Downloads</h1>
                        <p>
                            Tools for playing online using <em>Cockatrice</em>, or for printing and proxying your own
                            cube.
                        </p>
                        <p className="downloads-link">
                            <Link to="/terra/downloads">ᐳ Go to downloads</Link>
                        </p>
                    </div>
                </section>
                <section className="karn">
                    <img className="background-image" src={karnSplash} />
                    <div className="content">
                        <p className="karn-quotation">{karnQuotation}</p>
                    </div>
                </section>
            </main>
        </>
    );
}
