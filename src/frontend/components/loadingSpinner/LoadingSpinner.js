import * as React from "react";
import { RotatingLoadingIcon } from "../rotatingLoadingIcon/RotatingLoadingIcon";
import "./LoadingSpinner.scss";

export default function LoadingSpinner({ className }) {
    return (
        <div className={`loading-spinner${className ? ` ${className}` : ""}`}>
            <RotatingLoadingIcon />
        </div>
    );
}
