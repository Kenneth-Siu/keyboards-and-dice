import React from "react";
import { Link } from "react-router-dom";
import cardImageGallerySplash from "../../../../../data/cardImageGallerySplash.jpg";
import draftSplash from "../../../../../data/draftSplash.jpg";
import rulesFaqSplash from "../../../../../data/rulesFaqSplash.jpg";
import downloadsSplash from "../../../../../data/downloadsSplash.jpg";
import "./Home.scss";

export default function Home() {
    return (
        <>
            <title>Terra 2170</title>
            <main className="home-page">
                <div className="card-image-gallery tile">
                    <div className="splash">
                        <img className="splashImage" src={cardImageGallerySplash} />
                    </div>
                    <div className="content">
                        <h1>
                            <Link to="/terra/card-image-gallery">Card Image Gallery</Link>
                        </h1>
                        <p>
                            <em>Terra 2170</em> is a science-fiction <em>Magic: the Gathering</em> expansion with 273
                            cards and four new mechanics, created especially for drafting.
                        </p>
                        <p className="link">
                            <Link to="/terra/card-image-gallery">ᐳ See the cards</Link>
                        </p>
                    </div>
                </div>

                <div className="draft tile">
                    <div className="splash">
                        <img className="splashImage" src={draftSplash} />
                    </div>
                    <div className="content">
                        <h1>
                            <Link to="/terra/drafts">Draft Online</Link>
                        </h1>
                        <p>
                            Grab some friends and draft <em>Terra 2170</em> in your browser! Don't have eight people? No
                            problem, fill in the missing places with bots.
                        </p>
                        <p className="link">
                            <Link to="/terra/drafts">ᐳ Try it out</Link>
                        </p>
                    </div>
                </div>

                <div className="faq tile">
                    <div className="splash">
                        <img className="splashImage" src={rulesFaqSplash} />
                    </div>
                    <div className="content">
                        <h1>
                            <Link to="/terra/faq">Rules FAQ</Link>
                        </h1>
                        <p>
                            Frequently asked questions about how the new mechanics work, and also on individual cards.
                        </p>
                        <p className="link">
                            <Link to="/terra/faq">ᐳ Find out more</Link>
                        </p>
                    </div>
                </div>

                <div className="downloads tile">
                    <div className="splash">
                        <img className="splashImage" src={downloadsSplash} />
                    </div>
                    <div className="content">
                        <h1>
                            <Link to="/terra/downloads">Downloads</Link>
                        </h1>
                        <p>
                            Tools for playing online using <em>Cockatrice</em>, or for printing and proxying your own cube.
                        </p>
                        <p className="link">
                            <Link to="/terra/downloads">ᐳ View downloads</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
