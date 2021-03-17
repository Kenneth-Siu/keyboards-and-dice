import React from "react";
import "./BlurredPageBackground.scss";

export default function BlurredPageBackground({ imageName }) {
    return (
        <div className="background-image-container">
            <img className="background-image" src={imageName} />
        </div>
    );
}
