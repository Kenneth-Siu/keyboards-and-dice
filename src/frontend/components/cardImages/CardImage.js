import React, { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cardPlaceholder from "../../../../data/cardPlaceholder.png";
import "./CardImage.scss";

const CardImage = forwardRef(({ src, lazy, className, ...rest }, ref) => {
    if (lazy) {
        return (
            <LazyLoadImage
                wrapperClassName={`card-lazy-wrapper${className ? ` ${className}` : ""}`}
                className="card-image"
                placeholderSrc={cardPlaceholder}
                src={src}
                {...rest}
            />
        );
    }
    return (
        <img
            className={`card-image${className ? ` ${className}` : ""}`}
            src={src}
            ref={ref}
            {...rest}
        />
    );
});

export default CardImage;
