import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import terraSplashImage from "../../../../data/terraSplash.jpg";
import CommonSetSymbol from "../../../../data/commonSetSymbol.svg";
import "./TerraNavBar.scss";

export default function TerraNavBar() {
    const pathname = useLocation().pathname;
    return (
        <nav className="terra-nav-bar">
            <img className="background-image" src={terraSplashImage} />
            <ul>
                <li className="terra-home">
                    <Link to="/terra">
                        <CommonSetSymbol /> Terra 2170
                    </Link>
                </li>
                <li
                    className={`card-image-gallery ${
                        pathname.startsWith("/terra/card-image-gallery") ? "is-current-page" : ""
                    }`}
                >
                    <Link to="/terra/card-image-gallery">Card Image Gallery</Link>
                    <Link to="/terra/card-image-gallery" className="abbreviated" aria-hidden>
                        Gallery
                    </Link>
                </li>
                <li className={`faq ${pathname.startsWith("/terra/faq") ? "is-current-page" : ""}`}>
                    <Link to="/terra/faq">Rules FAQ</Link>
                    <Link to="/terra/faq" className="abbreviated" aria-hidden>
                        FAQ
                    </Link>
                </li>
                <li className={`draft ${pathname.startsWith("/terra/draft") ? "is-current-page" : ""}`}>
                    <Link to="/terra/drafts">Draft Online</Link>
                    <Link to="/terra/drafts" className="abbreviated" aria-hidden>
                        Draft
                    </Link>
                </li>
                <li className={`downloads ${pathname.startsWith("/terra/downloads") ? "is-current-page" : ""}`}>
                    <Link to="/terra/downloads">Downloads</Link>
                    <Link to="/terra/downloads" className="abbreviated" aria-hidden>
                        Downloads
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
