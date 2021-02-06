import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    return (
        <>
            <title>Terra 2170</title>
            <main className="home-page">
                <h1>Terra 2170</h1>
                <p>Blah blah blah</p>
                <Link to="/card-image-gallery">❮ Card Image Gallery</Link>
                <Link to="/draft">Draft now ❯</Link>
            </main>
        </>
    );
}
