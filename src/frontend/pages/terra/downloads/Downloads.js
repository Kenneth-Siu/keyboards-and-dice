import React from "react";
import "./Downloads.scss";
import cockatriceXml from "../../../../../data/terra2170.xml";
import downloadsSplash from "../../../../../data/downloadsSplash.jpg";
import printAndPlaySplash from "../../../../../data/printAndPlaySplash.jpg";
import { Link } from "react-router-dom";

export default function Downloads() {
    return (
        <>
            <title>Downloads · Terra 2170</title>
            <main className="downloads-page">
                <div className="cockatrice tile">
                    <img className="background-image" src={downloadsSplash} />
                    <div className="content">
                        <h1>Play on Cockatrice</h1>
                        <p>
                            Once you've completed a draft <Link to="/terra/drafts">here</Link>, you can copy your
                            decklist and save it as a deck in <em>Cockatrice</em>, ready to play against your other
                            drafters.
                        </p>
                        <p>
                            If you haven't already, you should install{" "}
                            <a href="https://cockatrice.github.io/">
                                <em>Cockatrice</em>
                            </a>{" "}
                            and run through its first time setup.
                        </p>
                        <ol>
                            <li>
                                Right-click <a href={cockatriceXml}>this link</a>, select "Save link as..." and save it
                                anywhere you like.
                            </li>
                            <li>Open Cockatrice.</li>
                            <li>
                                In the menu at the top, go to{" "}
                                <span className="mono-space">Card Database &gt; Add custom sets/cards</span>.
                            </li>
                            <li>Select the file you downloaded earlier and click "Open".</li>
                            <li>Restart Cockatrice.</li>
                            <li>
                                <em>
                                    (You can delete the file you downloaded earlier if you like. You don't need it any
                                    more.)
                                </em>
                            </li>
                        </ol>
                        <p>
                            Now, when you start up a game against your other drafters, you should be able to see all the
                            card images and text.
                        </p>
                    </div>
                </div>

                <div className="print tile">
                    <img className="background-image" src={printAndPlaySplash} />
                    <div className="content">
                        <h1>Print and Play</h1>
                        <p>You can also draft and play in person.</p>
                        <ol>
                            <li>
                                <Link to="/terra/print-and-play" target="_blank">
                                    Click here
                                </Link>{" "}
                                to see the entire set, rarity distributions included.
                            </li>
                            <li>Use your browser's print dialog and check a few things:</li>
                            <li>
                                The background of the page should be black so the card edges go up to the corners.{" "}
                                <em>
                                    (This makes cutting them much easier later — you can just cut straight lines and
                                    they're ready to be sleeved.)
                                </em>
                            </li>
                            <li>
                                The cards should be sized to fit inside a sleeve in front of a{" "}
                                <em>Magic: the Gathering</em> card, so check that scaling is set to 100%. Your sleeves
                                and setup may differ though, so consider printing out a page now as a test run.
                            </li>
                            <li>
                                Finally, adjust your margins to fit a good number of cards on each page. On A4, it
                                should be pretty straightforward to fit in a 3 by 3 grid.{" "}
                                <em>
                                    (You may want to tweak the margins so there's not too much wasted black ink on the
                                    edges of the grid.)
                                </em>
                            </li>
                            <li>
                                Once you've printed out the cards, cut them out and sleeve them up in front of actual
                                cards. Hopefully you have a large junk cards collection!
                            </li>
                        </ol>
                        <blockquote>
                            <p>
                                You can just shuffle up all of the cards and form a cube for drafting! The rarities are
                                close to actual boosters.
                            </p>
                            <p>
                                However, for a more realistic drafting experience, consider setting up boosters ahead of
                                time. Try this:
                            </p>
                            <ol>
                                <li>
                                    For the rare slot, shuffle the mythics and remove half of them. Shuffle the
                                    remaining mythics together with the rares, and then assign each booster pack a
                                    single card from this combined pile.
                                </li>
                                <li>
                                    For the uncommon slots, separate the uncommons into their colors{" "}
                                    <em>(put multicolor and colorless uncommons into a single shared pile)</em> and
                                    shuffle each pile by itself. Then, carefully riffle shuffle the piles into each
                                    other. Don't shuffle too much — this means the colors are roughly evenly
                                    distributed. Deal out the uncommons, three to each pack.
                                </li>
                                <li>
                                    For the common slots, separate the commons into their colors{" "}
                                    <em>(again, put multicolor and colorless uncommons into a single shared pile)</em>.
                                    For each of your six piles, shuffle it and deal <em>one</em> card out to each pack.
                                    Once done, you should have six commons per pack, one white, one blue, one black, one
                                    red, one green, and one land/artifact. Then, riffle together the remaining commons{" "}
                                    <em>(like for the uncommons)</em> and deal them out, four to each pack. By the end,
                                    each pack should have ten commons.
                                </li>
                            </ol>
                        </blockquote>
                    </div>
                </div>
            </main>
        </>
    );
}
