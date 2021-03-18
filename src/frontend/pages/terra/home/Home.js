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
import karnThePenitent from "../../../../../data/cardImages/Karn the Penitent.jpg";
import cryonicsFacility from "../../../../../data/cardImages/Cryonics Facility.jpg";
import tundraStrider from "../../../../../data/cardImages/Tundra Strider.jpg";
import hongWaiPrototype from "../../../../../data/cardImages/Hong Wai Prototype.jpg";
import homeostimulationSuit from "../../../../../data/cardImages/Homeostimulation Suit.jpg";
import warapurCompanyDrudge from "../../../../../data/cardImages/Warapur Company Drudge.jpg";
import hoverbike from "../../../../../data/cardImages/Hoverbike.jpg";
import reconstructionSpecialist from "../../../../../data/cardImages/Reconstruction Specialist.jpg";
import ripSpaceTime from "../../../../../data/cardImages/Rip Space-Time.jpg";
import broodAmbush from "../../../../../data/cardImages/Brood Ambush.jpg";
import warzoneMentor from "../../../../../data/cardImages/Warzone Mentor.jpg";
import vulcanDevastators from "../../../../../data/cardImages/Vulcan Devastators.jpg";
import biomechTeam from "../../../../../data/cardImages/Biomech Team.jpg";
import radiumTracker from "../../../../../data/cardImages/Radium Tracker.jpg";
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
                            Draft <em>Terra 2170</em> in your browser.
                        </p>
                        <p>You don't need the full eight people! Fill in the missing places with bots.</p>
                        <p className="draft-link">
                            <Link to="/terra/drafts">ᐳ Draft now</Link>
                        </p>
                        <div className="draft-showcase">
                        <div className="draft-showcase-elements">
                            <CardImage imageName={karnThePenitent} />
                            <CardImage imageName={cryonicsFacility} />
                            <CardImage imageName={tundraStrider} />
                            <CardImage imageName={hongWaiPrototype} />
                            <CardImage imageName={homeostimulationSuit} />
                            <CardImage imageName={warapurCompanyDrudge} />
                            <CardImage imageName={hoverbike} />
                            <CardImage imageName={reconstructionSpecialist} />
                            <CardImage imageName={ripSpaceTime} />
                            <CardImage imageName={broodAmbush} />
                            <CardImage imageName={warzoneMentor} />
                            <CardImage imageName={vulcanDevastators} />
                            <CardImage imageName={biomechTeam} />
                            <CardImage imageName={radiumTracker} />
                        </div>
                        </div>
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
