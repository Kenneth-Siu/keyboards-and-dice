import React from "react";
import { Link } from "react-router-dom";
import StcSymbol from "../../../../../data/stcSymbol.svg";
import stcMainSplash from "../../../../../data/stcMainSplash.jpg";
import "./NotFound.scss";

export default function StcNotFound() {
    return (
        <>
            <title>Page Not Found · Space the Convergence</title>
            <main className="stc-not-found-page">
                <img className="background-image" src={stcMainSplash} />
                <div className="container">
                    <StcSymbol />
                    <p>Whoops! There's nothing here...</p>
                    <Link to="/stc">ᐳ Back to safety</Link>
                </div>
            </main>
        </>
    );
}
