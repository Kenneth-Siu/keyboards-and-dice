import React from "react";
import cardList from "../../models/cardList.js";
import filterBackground from "../../../data/filterBackground.jpg";
import whiteManaSymbol from "../../../data/whiteManaSymbol.svg";
import blueManaSymbol from "../../../data/blueManaSymbol.svg";
import blackManaSymbol from "../../../data/blackManaSymbol.svg";
import redManaSymbol from "../../../data/redManaSymbol.svg";
import greenManaSymbol from "../../../data/greenManaSymbol.svg";
import goldManaSymbol from "../../../data/goldManaSymbol.svg";
import colorlessManaSymbol from "../../../data/colorlessManaSymbol.svg";
import commonSetSymbol from "../../../data/commonSetSymbol.svg";
import uncommonSetSymbol from "../../../data/uncommonSetSymbol.svg";
import rareSetSymbol from "../../../data/rareSetSymbol.svg";
import mythicSetSymbol from "../../../data/mythicSetSymbol.svg";
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
                <div className="filter-pane">
                    <img className="background-image" src={filterBackground} />
                    <div>
                        <button><img className="mana" src={whiteManaSymbol} /></button>
                        <button><img className="mana" src={blueManaSymbol} /></button>
                        <button><img className="mana" src={blackManaSymbol} /></button>
                        <button><img className="mana" src={redManaSymbol} /></button>
                        <button><img className="mana" src={greenManaSymbol} /></button>
                        <button><img className="mana" src={goldManaSymbol} /></button>
                        <button><img className="mana" src={colorlessManaSymbol} /></button>
                    </div>
                    <div>
                        <button><img className="" src={commonSetSymbol} /></button>
                        <button><img className="" src={uncommonSetSymbol} /></button>
                        <button><img className="" src={rareSetSymbol} /></button>
                        <button><img className="" src={mythicSetSymbol} /></button>
                    </div>
                </div>
            </main>
        </>
    );
}
