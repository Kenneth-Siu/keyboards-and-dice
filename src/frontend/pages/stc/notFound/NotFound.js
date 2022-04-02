import React from "react";
import { Link } from "react-router-dom";
import StcSymbol from "../../../../../data/stcSymbol.svg";
import notFoundSplash from "../../../../../data/notFoundSplash.jpg";
import "./NotFound.scss";

export default function StcNotFound() {
    return (
        <>
            <title>Page Not Found · Space the Convergence</title>
            <main className="stc-not-found-page">
                <img className="background-image" src={notFoundSplash} />
                <div className="container">
                    <StcSymbol />
                    <h1>Whoops! There's nothing here...</h1>
                    <Link to="/stc">ᐳ Back to safety</Link>
                </div>
            </main>
        </>
    );
}
