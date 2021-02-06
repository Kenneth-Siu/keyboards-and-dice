import React from "react";
import { Link } from "react-router-dom";
import cardList from "../../models/cardList.js";
import "./CardImageGallery.scss";

export default function CardImageGallery() {
    return (
        <>
            <title>Card Image Gallery · Terra 2170</title>
            <main className="card-image-gallery-page">
                <h1>Card Image Gallery</h1>
                <Link to="/">Home ❯</Link>
                <Link to="/draft">Draft now ❯</Link>
                { cardList.map(card => <img src={card.imageName} />) }
            </main>
        </>
    );
}
