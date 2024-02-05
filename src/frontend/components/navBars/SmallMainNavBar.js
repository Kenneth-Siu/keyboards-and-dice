import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import keyboardsAndDiceSplash from "../../../../data/keyboardsAndDiceSplash.jpg";
import KndLogo from "../../../../data/kndLogo.svg";
import "./SmallMainNavBar.scss";

export default function SmallMainNavBar() {
    return (
        <nav className="small-main-nav-bar">
            <img className="background-image" src={keyboardsAndDiceSplash} />
            <ul>
                <li className="home">
                    <Link to="/">
                        <KndLogo /> Keyboards &amp; Dice
                    </Link>
                </li>
                <li className="stc">
                    <NavLink to="/stc" activeClassName="is-current-page">Space the Convergence</NavLink>
                    <NavLink to="/stc" className="abbreviated" activeClassName="is-current-page" aria-hidden>
                        STC
                    </NavLink>
                </li>
                <li className="darkham">
                    <NavLink to="/darkham" activeClassName="is-current-page">Darkham Horror</NavLink>
                    <NavLink to="/darkham" className="abbreviated" activeClassName="is-current-page" aria-hidden>
                        Darkham
                    </NavLink>
                </li>
                <li className="nlc">
                    <NavLink to="/nlc" activeClassName="is-current-page">Netrunner: Last Contact</NavLink>
                    <NavLink to="/nlc" className="abbreviated" activeClassName="is-current-page" aria-hidden>
                        NLC
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
