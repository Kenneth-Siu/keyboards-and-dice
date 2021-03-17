import React from "react";
import { Link } from "react-router-dom";
import TerraSymbol from "../../../../../data/terraSymbol.svg";
import notFoundSplash from "../../../../../data/notFoundSplash.jpg";
import "./NotFound.scss";

export default function TerraNotFound() {
    return (
        <>
            <title>Page Not Found · Terra 2170</title>
            <main className="terra-not-found-page">
                <img className="background-image" src={notFoundSplash} />
                <div className="container">
                    <TerraSymbol />
                    <h1>Whoops! There's nothing here...</h1>
                    <Link to="/terra">ᐳ Back to safety</Link>
                </div>
            </main>
        </>
    );
}
