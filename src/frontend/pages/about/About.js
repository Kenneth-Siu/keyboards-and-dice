import React from "react";
import "./About.scss";
import aboutSplash from "../../../../data/aboutSplash.jpg";
import profilePicture from "../../../../data/profilePicture.jpg";
import theGreatRaven from "../../../../data/The Great Raven.jpg";

export default function About() {
    return (
        <>
            <title>About · Keyboards &amp; Dice</title>
            <main className="about-page">
                <div className="background-image-container">
                    <img className="background-image" src={aboutSplash} />
                </div>
                <div className="content">
                    <h1 className="page-heading">About me</h1>
                    <img src={profilePicture} className="profile" />
                    <div className="work">
                        <p>
                            Hi! I'm Kenny. Like all people, I contain multitudes. Here are two of them: work and games.
                        </p>
                        <h2>Work</h2>
                        <p>
                            I'm a technical lead with 9+ years of experience in software and tech, and I'm moving toward engineering management
                            because where I get the most fulfilment is when I'm able to help a team come together, grow, and achieve
                            something greater than any individual person could.
                        </p>
                        <blockquote>
                            <p>
                                I grew up solve puzzles and fixing things, and always thought I'd spend my career solving technical problems...
                                But then I spent several years as a trainer nurturing new software developers, and another year and a half
                                as a technical lead bringing people together across teams and clients, and supporting them to their goals.
                                The younger version of myself never would have expected how much helping others brings me joy!
                            </p>
                            <p>
                                I do still love solving technical problems—but what questions really get me out of bed each morning are things like
                                how to help people grow,
                                how to build the processes that support them, and how to create a culture of empathy, clarity, and curiosity.
                            </p>
                        </blockquote>
                        <p>You can find me on:</p>
                        <ul>
                            <li><a href="https://www.linkedin.com/in/kenneth-siu-7673118a/" target="_blank">
                                ᐳ LinkedIn
                            </a></li>
                            <li><a href="https://github.com/Kenneth-Siu/" target="_blank">
                                ᐳ GitHub
                            </a></li>
                        </ul>
                    </div>
                    <div className="games">
                        <h2>Games</h2>
                        <p>
                            That's one <em>Magic: the Gathering</em> custom set, and two <em>Arkham Horror</em> campaigns.
                            Dear me they took a long time to make. You can probably tell that I love a good card game.
                            Give me rogue-like deckbuilders any day of the week, but there's nothing quite like playing games
                            with your friends. If you have feedback on anything, feel free to drop me a message.
                        </p>
                        <p>You can find me on:</p>
                        <ul>
                            <li><a href="https://discordapp.com/users/210494923261214720" target="_blank">
                                ᐳ Discord
                            </a></li>
                        </ul>
                    </div>
                    <img src={theGreatRaven} className="raven" />
                </div>
            </main >
        </>
    );
}
