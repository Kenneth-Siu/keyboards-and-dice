import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
    return (
        <>
            <title>Page Not Found · Terra 2170</title>
            <main className="not-found-page">
                <h1>Whoops!</h1>
                <Link to="/">Home</Link>
            </main>
        </>
    );
}
