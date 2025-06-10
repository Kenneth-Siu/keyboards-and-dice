import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import CommonSetSymbol from "../../../../data/commonSetSymbol.svg";
import "./StcNavBar.scss";

export default function StcNavBar() {
    const pathname = useLocation().pathname;
    return (
        <nav className="stc-nav-bar">
            <ul>
                <li className={`stc-home ${getCurrentPath(pathname) === "home" ? "is-current-page" : ""}`}>
                    <Link to="/stc">
                        <CommonSetSymbol /> <span>Home</span>
                    </Link>
                </li>
                <li
                    className={`card-image-gallery ${getCurrentPath(pathname) === "card-image-gallery" ? "is-current-page" : ""}`}
                >
                    <Link to="/stc/card-image-gallery">Card Image Gallery</Link>
                </li>
                <li className={`faq ${getCurrentPath(pathname) === "faq" ? "is-current-page" : ""}`}>
                    <Link to="/stc/faq">Rules FAQ</Link>
                </li>
                <li className={`downloads ${getCurrentPath(pathname) === "downloads" ? "is-current-page" : ""}`}>
                    <Link to="/stc/downloads">Downloads</Link>
                </li>
            </ul>
        </nav>
    );
}

function getCurrentPath(pathname) {
    if (pathname.startsWith("/stc/card-image-gallery")) {
        return "card-image-gallery";
    }
    if (pathname.startsWith("/stc/faq")) {
        return "faq";
    }
    if (pathname.startsWith("/stc/downloads")) {
        return "downloads";
    }
    if (pathname.startsWith("/stc")) {
        return "home";
    }
    return "";
}