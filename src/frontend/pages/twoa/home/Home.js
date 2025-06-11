import * as React from "react";
import twoaSplash from "../../../../../data/twoa/twoaSplash.jpg";
import downloadsSplash from "../../../../../data/twoa/downloadsSplash.jpg";
import playerCardsSplash from "../../../../../data/twoa/playerCardsSplash.jpg";
import boxCover from "../../../../../data/twoa/netrunnerBoxArt.jpg";
import boxTop from "../../../../../data/twoa/BoxTop.jpg";
import boxSide from "../../../../../data/twoa/BoxSide.jpg";
import arEnhancedSecurity from "../../../../../data/twoa/AREnhancedSecurity.jpg";
import armandGeistWalker from "../../../../../data/twoa/investigators/ArmandGeistWalker.jpg";
import brainMachineInterface from "../../../../../data/twoa/BrainMachineInterface.jpg";
import cobra from "../../../../../data/twoa/Cobra.jpg";
import edgeOfTheNetwork from "../../../../../data/twoa/EdgeoftheNetwork.jpg";
import fenris from "../../../../../data/twoa/investigators/Fenris.jpg";
import gabrielSantiago from "../../../../../data/twoa/investigators/GabrielSantiago.jpg";
import hayleyKaplan from "../../../../../data/twoa/investigators/HayleyKaplan.jpg";
import hoshikoShiro from "../../../../../data/twoa/investigators/HoshikoShiro.jpg";
import maxx from "../../../../../data/twoa/investigators/MaxX.jpg";
import postedBounty from "../../../../../data/twoa/PostedBounty.jpg";
import quetzal from "../../../../../data/twoa/investigators/Quetzal.jpg";
import reinaRoja from "../../../../../data/twoa/investigators/ReinaRoja.jpg";
import rielleKitPeddler from "../../../../../data/twoa/investigators/RielleKitPeddler.jpg";
import sunnyLebeau from "../../../../../data/twoa/investigators/SunnyLebeau.jpg";
import taoSalonga from "../../../../../data/twoa/investigators/TaoSalonga.jpg";
import zahyaSadeghi from "../../../../../data/twoa/investigators/ZahyaSadeghi.jpg";
import "./Home.scss";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <title>The Worlds of Android · Keyboards &amp; Dice</title>
            <main className="twoa-page">
                <section className="overview">
                    <img className="background-image" src={twoaSplash} />
                    <div className="container">
                        <h1>A New Way of Seeing</h1>
                        <div className="box-div">
                            <div className="box-side-blurb">
                                <p>
                                    In the not-so-distant future, humanity has spread out across the solar system,
                                    unlocked the frontiers of cyberspace, and created millions of intelligent androids
                                    in its own image. But despite the information society created by the corporations,
                                    something undetected bubbles beneath the surface...
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
                            <em>The Worlds of Android</em> is a custom campaign for <em>Arkham Horror: The Card Game</em> for one
                            to four players, based upon the setting of <em>Android: Netrunner</em>.
                        </p>
                        <p>
                            This campaign reimagines the events of the 23 Seconds as the players take the role of a group
                            of detectives in the NAPD, tasked by Police Commissioner Dawn to uncover the truth behind the
                            attack on the banking system. With both new encounter cards and new investigators, what mysteries
                            of the net will you uncover?
                        </p>
                    </div>
                </section>
                <section className="downloads">
                    <img className="background-image" src={downloadsSplash} />
                    <div className="container">
                        <h1>Campaign Expansion</h1>
                        <p>
                            Seemingly at every turn, the corporations are involved in your investigation, tracking your
                            every movement and hidering you along the way. Is one of them secretly behind the disaster? Or are
                            they simply being short-sighted in overzealously defending their interests?
                        </p>
                        <div className="canvas encounters">
                            <img src={edgeOfTheNetwork} className="card edge-of-the-network" />
                            <img src={cobra} className="card cobra" />
                            <img src={brainMachineInterface} className="card brain-machine-interface" />
                            <img src={arEnhancedSecurity} className="card ar-enhanced-security" />
                            <img src={postedBounty} className="card posted-bounty" />
                        </div>
                        <p>
                            In your investigations, you will uncover the darkest mysteries of the Network thanks
                            to your Brain-Machine Interface. Cyberspace is home to its own ecosystem of orphaned programs,
                            deadly hunter ICE, and of course the other denizens of the Net. But something is adding its
                            own mark on this virtual reality, leaving corrupted data in its wake. Only you can decipher what
                            it means...
                        </p>
                        <p className="link">
                            <Link to="/twoa/downloads">ᐳ Go to download</Link>
                        </p>
                    </div>
                </section>
                <section className="player-cards">
                    <img className="background-image" src={playerCardsSplash} />
                    <div className="container">
                        <h1>Investigator Expansion</h1>
                        <p>
                            The people of Earth, Luna, and Mars are a varied and fractious population.
                            They come from all walks of life, vary dramatically in skill sets, goals, and available resources,
                            and come together in all sorts of different ways, in a myriad of organizations
                            and affiliations. These 12 new investigators will bring a taste of <em>Android: Netrunner</em> to
                            your game of <em>Arkham Horror</em>.
                        </p>
                        <div className="canvas player-cards">
                            <img src={gabrielSantiago} className="card landscape" />
                            <img src={hoshikoShiro} className="card landscape" />
                            <img src={quetzal} className="card landscape" />
                            <img src={reinaRoja} className="card landscape" />
                            <img src={fenris} className="card landscape" />
                            <img src={hayleyKaplan} className="card landscape" />
                            <img src={sunnyLebeau} className="card landscape" />
                            <img src={maxx} className="card landscape" />
                            <img src={rielleKitPeddler} className="card landscape" />
                            <img src={armandGeistWalker} className="card landscape" />
                            <img src={taoSalonga} className="card landscape" />
                            <img src={zahyaSadeghi} className="card landscape" />
                        </div>
                        <p>
                            From Gabriel Santiago to Zahya Sadeghi, runners both old and new make appearances across
                            the full spectrum... Anarch, Criminal, Shaper, and even Sunny, along with a special guest
                            appearance from DJ Fenris! They bring with them abilities at times inspired by
                            their <em>Android: Netrunner</em> cards, and at times inspired by their backstory.
                            Jack in and make a run with them!
                        </p>
                        <p className="link">
                            <Link to="/twoa/player-cards">ᐳ View the player cards (coming soon)</Link>
                        </p>
                    </div>
                </section>
            </main >
        </>
    );
}
