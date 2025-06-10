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
                    </NavLink>
                </li>
                <li className="twoa">
                    <NavLink to="/twoa" activeClassName="is-current-page">
                        <span>Worlds of Android</span>
                    </NavLink>
                </li>
                <li className="darkham">
                    <NavLink to="/darkham" activeClassName="is-current-page">
                        <span>Darkham Horror</span>
                    </NavLink>
                </li>
                <li className="about">
                    <NavLink to="/about" activeClassName="is-current-page">
                        <span>About</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
