import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import stcSplashImage from "../../../../data/stcSplash.jpg";
import CommonSetSymbol from "../../../../data/commonSetSymbol.svg";
import "./StcNavBar.scss";

export default function StcNavBar() {
    const pathname = useLocation().pathname;
    return (
        <nav className="stc-nav-bar">
            <img className="background-image" src={stcSplashImage} />
            <ul>
                <li className="stc-home">
                    <Link to="/stc">
                        <CommonSetSymbol /> Space the Convergence
                    </Link>
                </li>
                <li
                    className={`card-image-gallery ${
                        pathname.startsWith("/stc/card-image-gallery") ? "is-current-page" : ""
                    }`}
                >
                    <Link to="/stc/card-image-gallery">Card Image Gallery</Link>
                    <Link to="/stc/card-image-gallery" className="abbreviated" aria-hidden>
                        Gallery
                    </Link>
                </li>
                <li className={`faq ${pathname.startsWith("/stc/faq") ? "is-current-page" : ""}`}>
                    <Link to="/stc/faq">Rules FAQ</Link>
                    <Link to="/stc/faq" className="abbreviated" aria-hidden>
                        FAQ
                    </Link>
                </li>
                <li className={`draft ${pathname.startsWith("/stc/draft") ? "is-current-page" : ""}`}>
                    <Link to="/stc/drafts">Draft Online</Link>
                    <Link to="/stc/drafts" className="abbreviated" aria-hidden>
                        Draft
                    </Link>
                </li>
                <li className={`downloads ${pathname.startsWith("/stc/downloads") ? "is-current-page" : ""}`}>
                    <Link to="/stc/downloads">Downloads</Link>
                    <Link to="/stc/downloads" className="abbreviated" aria-hidden>
                        Downloads
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
