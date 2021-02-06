import React from "react";
import { Link } from "react-router-dom";
import "./Draft.scss";

export default function Draft() {
    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="draft-page">
                <h1>Draft</h1>
                <Link to="/card-image-gallery">❮ Card Image Gallery</Link>
                <Link to="/">❮ Home</Link>
            </main>
        </>
    );
}
