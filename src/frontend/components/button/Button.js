import React from "react";
import "./Button.scss";

export function Button({ children, onClick, className, ...rest }) {
    return (
        <button className={`button${className ? ` ${className}` : ""}`} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}
