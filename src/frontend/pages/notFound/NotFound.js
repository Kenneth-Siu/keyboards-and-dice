import React from "react";
import { Link } from "react-router-dom";
import TerraSymbol from "../../../../data/terraSymbol.svg";
import notFoundSplash from "../../../../data/notFoundSplash.jpg";
import "./NotFound.scss";

export default function NotFound() {
    return (
        <>
            <title>Page Not Found · Keyboards &amp; Dice</title>
            <main className="not-found-page">
                <img className="background-image" src={notFoundSplash} />
                <div className="container">
                    <TerraSymbol />
                    <h1>Whoops! There's nothing here...</h1>
                    <Link to="/">ᐳ Back to safety</Link>
                </div>
            </main>
        </>
    );
}
