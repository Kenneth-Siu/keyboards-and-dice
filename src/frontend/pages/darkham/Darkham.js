import * as React from "react";
import darkhamSplash from "../../../../data/Darkham/darkhamSplash.jpg";
import downloadsSplash from "../../../../data/Darkham/downloadsSplash.jpg";
import playerCardsSplash from "../../../../data/Darkham/playerCardsSplash.jpg";
import abdulAlhazredFront from "../../../../data/Darkham/Abdul-Alhazred-Front-Face.jpg";
import abdulAlhazredBack from "../../../../data/Darkham/Abdul-Alhazred-Back-Face.jpg";
import theCollector from "../../../../data/Darkham/The-Collector-Front-Face.jpg";
import collected0 from "../../../../data/Darkham/Collected-Front-Face - Copy.jpg";
import collected1 from "../../../../data/Darkham/Collected-Front-Face - Copy (2).jpg";
import collected2 from "../../../../data/Darkham/Collected-Front-Face.jpg";
import dangersInTheDark from "../../../../data/Darkham/Dangers-in-the-Dark-Front-Face.jpg";
import pressuresOfTheDark from "../../../../data/Darkham/Pressures-of-the-Dark-Front-Face.jpg";
import mentorsSkull from "../../../../data/Darkham/Mentor's-Skull-Front-Face.jpg";
import boxCover from "../../../../data/Darkham/BoxCover.jpg";
import boxTop from "../../../../data/Darkham/BoxTop.jpg";
import boxSide from "../../../../data/Darkham/BoxSide.jpg";
import "./Darkham.scss";
import { Link } from "react-router-dom";

export default function Darkham() {
    return (
        <>
            <title>Darkham Horror · Keyboards &amp; Dice</title>
            <main className="darkham-page">
                <section className="overview">
                    <img className="background-image" src={darkhamSplash} />
                    <div className="container">
                        <h1>The Evil Within</h1>
                        <div className="box-div">
                            <div className="box-side-blurb">
                                <p>
                                    In rural France, a small seaside hamlet slumbers under the long shadow of a clifftop manor.
                                    Despite the town's small stature, it has a venerable and sorrowful history, riddled with pacts
                                    and secrets, for the ancient estate that overlooks it was built with an unnamable purpose. What
                                    will you find beneath the manor?
                                </p>
                            </div>
                            <div className="box-canvas">
                                <div className="box-elements">
                                    <img src={boxCover} className="box-cover" />
                                    <img src={boxTop} className="box-top" />
                                    <img src={boxSide} className="box-side" />
                                </div>
                            </div>
                        </div>

                        <p>
                            <em>Darkham Horror</em> is a custom campaign for <em>Arkham Horror: The Card Game</em> for one
                            to four players, based upon the setting of <em>Darkest Dungeon</em>.
                        </p>
                        <p>
                            In this campaign, the lead investigator has inherited a manor from their long-missing ancestor,
                            and the players take the role of a group of investigators looking into the mysteries that
                            surround it. With both new encounter cards and new player cards, what ancient plans will you
                            uncover?
                        </p>
                    </div>
                </section>
                <section className="downloads">
                    <img className="background-image" src={downloadsSplash} />
                    <div className="container">
                        <h1>Campaign Expansion</h1>
                        <p>
                            As soon as you step foot inside, the darkness closes in on you, suffocating and
                            oppressive. Every creak and whistle from the dilapidated rooms could be a monstrous inhabitant
                            stalking you... or perhaps it's just all in your mind?
                        </p>
                        <div className="canvas encounters">
                            <img src={collected2} className="card collected-2" />
                            <img src={collected1} className="card collected-1" />
                            <img src={collected0} className="card collected-0" />
                            <img src={theCollector} className="card the-collector" />
                            <img src={pressuresOfTheDark} className="card pressures-of-the-dark" />
                            <img src={dangersInTheDark} className="card dangers-in-the-dark" />
                        </div>
                        <p>
                            While delving into the dungeons, you will be fighting against the encroaching darkness with your
                            limited, fading light. Although there surely cannot be many living beings left in the dungeons,
                            there are still many dangers that lurk in the dark, from The Collector and their “collection” to
                            the ravenous sufferers of the Crimson Curse. But not all threats lurk in the physical world...
                        </p>
                        <p className="link">
                            <Link to="/darkham/downloads">ᐳ Go to download</Link>
                        </p>
                    </div>
                </section>
                <section className="player-cards">
                    <img className="background-image" src={playerCardsSplash} />
                    <div className="container">
                        <h1>Investigator Expansion</h1>
                        <p>
                            Just as the inhabitants of the manor sought power from unlikely places, you can grasp at
                            greatness with your own hands. New player cards introduce a host of powerful effects that add a
                            weakness to your deck as part of its cost, though perhaps you might find a way to take advantage
                            of your weaknesses. You might say that strength and weakness are really two sides of the same
                            coin.
                        </p>
                        <div className="canvas player-cards">
                            <img src={abdulAlhazredBack} className="card landscape abdul-alhazred-back" />
                            <img src={mentorsSkull} className="card mentors-skull" />
                            <img src={abdulAlhazredFront} className="card landscape abdul-alhazred" />
                        </div>
                        <p>
                            Abdul Alhazred, the author of the original Necronomicon, is one of the five new investigators
                            and toys with eldritch power in new ways. He is able to find any whatever spell or ritual he
                            needs at a moment's notice, but also has to draw a weakness to do so. Additionally, his dabbling
                            in the eldritch has widened the possible spells and rituals he can add to his deck, but delving
                            too deep means he has to add extra basic weaknesses too. With his unparalleled access to a
                            variety of magic, he will be a potent addition to any group of investigators, and the price is
                            surely worth it...
                        </p>
                        <p className="link">
                            <Link to="/darkham/player-cards">ᐳ View the player cards</Link>
                        </p>
                    </div>
                </section>
            </main >
        </>
    );
}
