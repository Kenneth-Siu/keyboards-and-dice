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
                        Space the Convergence
                    </NavLink>
                </li>
                <li className="darkham">
                    <NavLink to="/darkham" activeClassName="is-current-page">
                        Darkham Horror
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
