import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SubNavBar.scss";

export default function SubNavBar({ basePath, items }) {
    const pathname = useLocation().pathname;
    return (
        <nav className="sub-nav-bar">
            <ul>
                {items.map(item => (
                    <li key={item.path} className={`${getCurrentPath(pathname, basePath, items) === item.path ? "is-current-page" : ""}`}>
                        <Link to={`/${basePath}/${item.path}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function getCurrentPath(pathname, basePath, items) {
    for (const item of items) {
        if (pathname.startsWith(`/${basePath}/${item.path}`)) {
            return item.path;
        }
    }
    return "";
}