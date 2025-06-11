import React from "react";
import { Link } from "react-router-dom";
import stcSplash from "../../../../data/stcMainSplash.jpg";
import darkhamSplash from "../../../../data/Darkham/darkhamSplash.jpg";
import twoaSplash from "../../../../data/twoa/twoaSplash.jpg";
import aboutSplash from "../../../../data/aboutSplash.jpg";
import theChronos from "../../../../data/cardImages/The Chronos.jpg";
import cruxOfSpaceTime from "../../../../data/cardImages/Crux of Space-Time.jpg";
import rangorIrregulars from "../../../../data/cardImages/Rangor Irregulars.jpg";
import shisukuSewerDweller from "../../../../data/cardImages/Shisuku Sewer-Dweller.jpg";
import brainMachineInterface from "../../../../data/twoa/BrainMachineInterface.jpg";
import cobra from "../../../../data/twoa/Cobra.jpg";
import edgeOfTheNetwork from "../../../../data/twoa/EdgeoftheNetwork.jpg";
import gabrielSantiago from "../../../../data/twoa/investigators/GabrielSantiago.jpg";
import reynauldDeChatillon from "../../../../data/Darkham/Investigators/Reynauld-de-Châtillon-Front-Face.jpg";
import dangersInTheDark from "../../../../data/Darkham/Dangers-in-the-Dark-Front-Face.jpg";
import theCollector from "../../../../data/Darkham/The-Collector-Front-Face.jpg";
import evilWithin from "../../../../data/Darkham/Evil-Within-Front-Face.jpg";
import "./Home.scss";

export default function Home() {
    return (
        <>
            <title>Keyboards &amp; Dice</title>
            <main className="home-page">
                <section className="stc">
                    <img className="background-image" src={stcSplash} />
                    <div className="content">
                        <div className="headings">
                            <h1>
                                Magic: The Gathering
                            </h1>
                            <h2>
                                <Link to="/stc">Space the Convergence</Link>
                            </h2>
                        </div>
                        <div className="canvas mtg">
                            <img src={shisukuSewerDweller} />
                            <img src={rangorIrregulars} />
                            <img src={cruxOfSpaceTime} />
                            <img src={theChronos} />
                        </div>
                        <div className="blurb">
                            <p>
                                What new powers and allies would planeswalkers bring to bear if they had access to
                                futuristic Earth technology?
                            </p>
                            <p>
                                <em>Space the Convergence</em> is a science-fiction <em>Magic: the Gathering</em> expansion with 273
                                cards and four new mechanics, created especially for drafting.
                            </p>
                            <p className="link">
                                <Link to="/stc">ᐳ Find out more</Link>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="twoa">
                    <img className="background-image" src={twoaSplash} />
                    <div className="content">
                        <div className="headings">
                            <h1>
                                Arkham Horror: The Card Game
                            </h1>
                            <h2>
                                <Link to="/twoa">The Worlds of Android</Link>
                            </h2>
                        </div>
                        <div className="canvas arkham">
                            <img src={edgeOfTheNetwork} />
                            <img src={cobra} />
                            <img src={brainMachineInterface} />
                            <img src={gabrielSantiago} className="landscape" />
                        </div>
                        <div className="blurb">
                            <p>
                                It is the future. The world changed. People did not.
                                Something brews in cyberspace that not even the
                                corporations suspect...
                            </p>
                            <p>
                                <em>The Worlds of Android</em> is an expansion for <em>Arkham Horror: The Card Game</em> themed
                                around <em>Android: Netrunner</em>, featuring 11 scenarios and 12 new investigators.
                            </p>
                            <p className="link">
                                <Link to="/twoa">ᐳ Find out more</Link>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="darkham">
                    <img className="background-image" src={darkhamSplash} />
                    <div className="content">
                        <div className="headings">
                            <h1>
                                Arkham Horror: The Card Game
                            </h1>
                            <h2>
                                <Link to="/darkham">Darkham Horror</Link>
                            </h2>
                        </div>
                        <div className="canvas arkham">
                            <img src={evilWithin} />
                            <img src={theCollector} />
                            <img src={dangersInTheDark} />
                            <img src={reynauldDeChatillon} className="landscape" />
                        </div>
                        <div className="blurb">
                            <p>
                                A curious letter from a long-lost ancestor reveals a dark mystery. What cosmic horrors will
                                you uncover in your investigation?
                            </p>
                            <p>
                                <em>Darkham Horror</em> is an expansion for <em>Arkham Horror: The Card Game</em> themed
                                around <em>Darkest Dungeon</em>, featuring 8 scenarios and new player cards.
                            </p>
                            <p className="link">
                                <Link to="/darkham">ᐳ Find out more</Link>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about">
                    <img className="background-image" src={aboutSplash} />
                    <div className="content">
                        <div className="headings">
                            <h2>
                                <Link to="/about">About me</Link>
                            </h2>
                        </div>
                        <div className="blurb">
                            <p>
                                Hi! Welcome to my cozy corner of the internet.
                            </p>
                            <p>
                                By day, I work in tech — I'm currently looking for work as an Engineering Manager, so drop me a message if you're in need...
                            </p>
                            <p>
                                By night, I love games of all sorts and I make these silly little things you can see here. Check them out!
                            </p>
                            <p className="link">
                                <Link to="/about">ᐳ Find out more</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
