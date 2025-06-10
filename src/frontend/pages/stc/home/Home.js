import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import stcMainSplash from "../../../../../data/stcMainSplash.jpg";
import rulesFaqSplash from "../../../../../data/rulesFaqSplash.jpg";
import downloadsSplash from "../../../../../data/downloadsSplash.jpg";
import karnSplash from "../../../../../data/karnSplash.jpg";
import "./Home.scss";
import CardImage from "../../../components/cardImages/CardImage";
import timeParadox from "../../../../../data/cardImages/Time Paradox.jpg";
import kushakResearchCouncil from "../../../../../data/cardImages/Kushak Research Council.jpg";
import shadowlightInfiltrator from "../../../../../data/cardImages/Shadowlight Infiltrator.jpg";
import acquisitorDelwani from "../../../../../data/cardImages/Acquisitor Delwani.jpg";
import { getRandomKarnFlavorText } from "./karnFlavorTexts.js";

export default function StcHome() {
    const [karnQuotation, setKarnQuotation] = useState();
    useEffect(() => {
        setKarnQuotation(getRandomKarnFlavorText());
    }, []);
    return (
        <>
            <title>Space the Convergence</title>
            <main className="stc-home-page">
                <section className="mechanics">
                    <img className="background-image" src={stcMainSplash} />
                    <div className="content">
                        <h1>The Future is Now</h1>
                        <div className="two-column">
                            <div>
                                <p>
                                    Apply cutting-edge technological advances to your planeswalker duels. Command armies,
                                    discover alien secrets, and make backroom dealings in a futuristic vision of Earth.
                                </p>
                                <p>
                                    <em>Space the Convergence</em> is a science-fiction <em>Magic: the Gathering</em> expansion
                                    with 273 cards and four new mechanics, created especially for drafting.
                                </p>
                            </div>
                            <div>
                                <p>
                                    <Link to="/stc/card-image-gallery">ᐳ View the cards</Link>
                                </p>
                            </div>
                        </div>
                        <div className="mechanics-showcase">
                            <figure>
                                <CardImage lazy src={timeParadox} />
                                <figcaption>New Mechanic: Teleport</figcaption>
                            </figure>
                            <figure>
                                <CardImage lazy src={kushakResearchCouncil} />
                                <figcaption>New Mechanic: Reconstitute</figcaption>
                            </figure>
                            <figure>
                                <CardImage lazy src={shadowlightInfiltrator} />
                                <figcaption>New Mechanic: Infiltrate</figcaption>
                            </figure>
                            <figure>
                                <CardImage lazy src={acquisitorDelwani} />
                                <figcaption>New Mechanic: Arm</figcaption>
                            </figure>
                        </div>
                    </div>
                </section>
                <section className="faq">
                    <img className="background-image" src={rulesFaqSplash} />
                    <div className="content">
                        <h1>Rules FAQ</h1>
                        <p>Frequently asked rules questions about both the new mechanics and cards in the set.</p>
                        <p className="faq-link">
                            <Link to="/stc/faq">ᐳ Find out more</Link>
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
                            <Link to="/stc/downloads">ᐳ Go to downloads</Link>
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
