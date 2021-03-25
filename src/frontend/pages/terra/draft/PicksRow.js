import React from "react";
import CardImage from "../../../components/cardImages/MagicCardImage";
import "./PicksRow.scss";

export function PicksRow({ row, cardOnClick }) {
    const nameBarHeight = 1.85;
    const cardHeight = 16.664;
    return (
        <div className="picks-row">
            {row.map((pile, pileIndex) => (
                <div
                    key={pileIndex}
                    className="column"
                    style={{ height: `${Math.max(0, pile.length - 1) * nameBarHeight + cardHeight}vw` }}
                >
                    {pile.map((pick, pickIndex) => (
                        <div
                            key={pickIndex}
                            className="card"
                            style={{
                                top: `${pickIndex * nameBarHeight}vw`,
                                height: `${pickIndex === pile.length - 1 ? cardHeight : nameBarHeight}vw`,
                            }}
                            onClick={() => cardOnClick(pileIndex, pickIndex)}
                        >
                            <CardImage imageName={pick.imageName} lazy />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
