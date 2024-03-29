import React from "react";
import { Link } from "react-router-dom";
import stcSplash from "../../../../data/stcSplash.jpg";
import darkhamSplash from "../../../../data/darkhamSplash.jpg";
import "./Home.scss";

export default function Home() {
    return (
        <>
            <title>Keyboards &amp; Dice</title>
            <main className="home-page">
                <div className="stc tile">
                    <img className="background-image" src={stcSplash} />
                    <div className="content">
                        <h1>
                            <Link to="/stc">Space the Convergence</Link>
                        </h1>
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

                <div className="darkham tile">
                    <img className="background-image" src={darkhamSplash} />
                    <div className="content">
                        <h1>
                            <Link to="/darkham">Darkham Horror</Link>
                        </h1>
                        <p>
                            A curious letter from a long-lost ancestor reveals a dark mystery. What cosmic horrors will
                            you uncover in your investigation?
                        </p>
                        <p>
                            <em>Darkham Horror</em> is an expansion for <em>Arkham Horror: The Card Game</em> themed
                            around <em>Darkest Dungeon</em>, featuring 8 scenarios and new investigator cards.
                        </p>
                        <p className="link">
                            <Link to="/darkham">ᐳ Find out more</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
