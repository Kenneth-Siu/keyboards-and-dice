import React from "react";
import { Link } from "react-router-dom";
import commonSetSymbol from "../../../data/commonSetSymbol.svg";
import "./NotFound.scss";

export default function NotFound() {
    return (
        <>
            <title>Page Not Found · Terra 2170</title>
            <main className="not-found-page">
                <Link to="/">
                    <img src={commonSetSymbol} />
                </Link>
                <h1>Whoops! There's nothing here...</h1>
                <Link to="/">Back to safety</Link>
            </main>
        </>
    );
}
