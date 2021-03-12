import React from "react";
import LazyLoad from "react-lazyload";
import cardPlaceholder from "../../../../data/cardPlaceholder.png";
import "./CardImage.scss";

export default function CardImage({ imageName, lazy, ...rest }) {
    if (lazy) {
        return (
            <LazyLoad
                className="card-lazy-wrapper"
                placeholder={<img className="card-image" src={cardPlaceholder} />}
                resize
                {...rest}
            >
                <img className="card-image" src={imageName} />
            </LazyLoad>
        );
    }
    return <img className="card-image" src={imageName} {...rest} />;
}
