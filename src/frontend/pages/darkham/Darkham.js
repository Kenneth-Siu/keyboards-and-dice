import * as React from "react";
import darkhamSplash from "../../../../data/darkhamSplash.jpg";
import abdulAlhazredFront from "../../../../data/Darkham/Abdul-Alhazred-Front-Face.jpg";
import abdulAlhazredBack from "../../../../data/Darkham/Abdul-Alhazred-Back-Face.jpg";
import underTorchlight from "../../../../data/Darkham/Under-Torchlight-I-Front-Face.jpg";
import moiraiShroud from "../../../../data/Darkham/Moirai-Shroud-Front-Face.jpg";
import damnationsGift from "../../../../data/Darkham/Damnation's-Gift-Front-Face.jpg";
import beyondSpaceAndTime from "../../../../data/Darkham/Beyond-Space-and-Time-Front-Face.jpg";
import forgottenMirror from "../../../../data/Darkham/Forgotten-Mirror-Front-Face.jpg";
import theCollector from "../../../../data/Darkham/The-Collector-Front-Face.jpg";
import collected0 from "../../../../data/Darkham/Collected-Front-Face - Copy.jpg";
import collected1 from "../../../../data/Darkham/Collected-Front-Face - Copy (2).jpg";
import collected2 from "../../../../data/Darkham/Collected-Front-Face.jpg";
import dangersInTheDark from "../../../../data/Darkham/Dangers-in-the-Dark-Front-Face.jpg";
import stalkingShadow from "../../../../data/Darkham/Stalking-Shadow.jpg";
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
                <div className="background-image-container">
                    <img className="background-image" src={darkhamSplash} />
                </div>
                <div className="container">
                    <div className="box-div">
                        <div className="box-canvas">
                            <div className="box-elements">
                                <img src={boxCover} className="box-cover" />
                                <img src={boxTop} className="box-top" />
                                <img src={boxSide} className="box-side" />
                            </div>
                        </div>
                        <div className="box-side-download-link">
                            <Link to="/darkham/downloads">ᐳ Download for Tabletop Simulator</Link>
                        </div>
                    </div>
                    <p>
                        In rural France, a small seaside hamlet slumbers under the long shadow of a clifftop manor.
                        Despite the town's small stature, it has a venerable and sorrowful history, riddled with pacts
                        and secrets, for the ancient estate that overlooks it was built with an unnamable purpose. What
                        will you find beneath the manor?
                    </p>
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
                    <div className="canvas overview">
                        <img src={damnationsGift} className="card damnations-gift" />
                        <img src={moiraiShroud} className="card moirai-shroud" />
                        <img src={forgottenMirror} className="card forgotten-mirror" />
                        <img src={beyondSpaceAndTime} className="card beyond-space-and-time" />
                        <img src={underTorchlight} className="card landscape under-torchlight" />
                        <img src={abdulAlhazredFront} className="card landscape abdul-alhazred" />
                    </div>
                    <h2>A Dying Light</h2>
                    <p>
                        As soon as you step foot inside the dungeons, the darkness closes in on you, suffocating and
                        oppressive. Every creak and whistle from the dilapidated rooms could be a monstrous inhabitant
                        stalking you... or perhaps it's just all in your mind?
                    </p>
                    <div className="canvas encounters">
                        <img src={collected2} className="card collected-2" />
                        <img src={collected1} className="card collected-1" />
                        <img src={collected0} className="card collected-0" />
                        <img src={theCollector} className="card the-collector" />
                        <img src={dangersInTheDark} className="card dangers-in-the-dark" />
                        <img src={stalkingShadow} className="card stalking-shadow" />
                    </div>
                    <p>
                        From part-way through the first scenario, you will be fighting against the shadow with your
                        limited, fading light. Although there surely cannot be many living beings left in the dungeons,
                        there are still many dangers that lurk in the dark, from The Collector and their “collection” to
                        the ravenous sufferers of the Crimson Curse. But remember that not all threats lurk in the
                        physical world.
                    </p>
                    <h2>Double-Edged Swords</h2>
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
                    <h2>Evil Within</h2>
                    <p>
                        The mysteries of your ancestor await you. Will you claim your birthright or will you succumb to
                        death and madness?
                    </p>
                    <p className="final-download-link">
                        <Link to="/darkham/downloads">ᐳ Download for Tabletop Simulator</Link>
                    </p>
                </div>
            </main>
        </>
    );
}
