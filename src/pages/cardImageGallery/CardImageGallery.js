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
                <p className="num-of-cards">{cardList.length} cards</p>
                <div className="card-grid">
                    {cardList.map((card) => (
                        <img className="card" src={card.imageName} key={card.id} loading="lazy" />
                    ))}
                </div>
            </main>
        </>
    );
}
