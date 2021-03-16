import React from "react";
import { Link } from "react-router-dom";
import TerraSymbol from "../../../../data/terraSymbol.svg";
import "./NotFound.scss";

export default function NotFound() {
    return (
        <>
            <title>Page Not Found · Keyboards &amp; Dice</title>
            <main className="not-found-page">
                <Link to="/">
                    <TerraSymbol />
                </Link>
                <h1>Whoops! There's nothing here...</h1>
                <Link to="/">Back to safety</Link>
            </main>
        </>
    );
}
