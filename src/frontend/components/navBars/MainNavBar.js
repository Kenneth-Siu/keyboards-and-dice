import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import keyboardsAndDiceSplash from "../../../../data/keyboardsAndDiceSplash.jpg";
import KndLogo from "../../../../data/kndLogo.svg";
import "./MainNavBar.scss";

export default function MainNavBar() {
    return (
        <nav className="main-nav-bar">
            <img className="background-image" src={keyboardsAndDiceSplash} />
            <ul>
                <li className="home">
                    <Link to="/">
                        <KndLogo /> Keyboards &amp; Dice
                    </Link>
                </li>
                <li className="stc">
                    <NavLink to="/stc" activeClassName="is-current-page">
                        <span>Space the Convergence</span>
                        <span className="abbreviated" aria-hidden>
                            Space
                        </span>
                    </NavLink>
                </li>
                <li className="darkham">
                    <NavLink to="/darkham" activeClassName="is-current-page">
                        <span>Darkham Horror</span>
                        <span className="abbreviated" aria-hidden>
                            Darkham
                        </span>
                    </NavLink>
                </li>
                <li className="nlc">
                    <NavLink to="/nlc" activeClassName="is-current-page">
                        <span>Netrunner: Last Contact</span>
                        <span className="abbreviated" aria-hidden>
                            Last Contact
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
