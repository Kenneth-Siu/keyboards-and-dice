import React from "react";
import "./PillButton.scss";

export function PillButton({ children, onClick, className, ...rest }) {
    return (
        <button className={`pill-button${className ? ` ${className}` : ""}`} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}
