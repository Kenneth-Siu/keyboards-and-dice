import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cardPlaceholder from "../../../../data/cardPlaceholder.png";
import "./MagicCardImage.scss";

export default function CardImage({ imageName, lazy, ...rest }) {
    if (lazy) {
        return (
            <LazyLoadImage
                wrapperClassName="card-lazy-wrapper"
                className="card-image"
                placeholderSrc={cardPlaceholder}
                src={imageName}
                {...rest}
            />
        );
    }
    return <img className="card-image" src={imageName} {...rest} />;
}
