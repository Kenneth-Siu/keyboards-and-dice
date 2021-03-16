import React from "react";
import { Link } from "react-router-dom";
import TerraSymbol from "../../../../../data/terraSymbol.svg";
import "./NotFound.scss";

export default function NotFound() {
    return (
        <>
            <title>Page Not Found · Terra 2170</title>
            <main className="not-found-page">
                <Link to="/terra">
                    <TerraSymbol />
                </Link>
                <h1>Whoops! There's nothing here...</h1>
                <Link to="/terra">Back to safety</Link>
            </main>
        </>
    );
}
