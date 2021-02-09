import React from "react";
import "./Draft.scss";

export default function Draft({ userDisplayName }) {
    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="draft-page">
                <h1>Draft</h1>
                <p>Hello, {userDisplayName}</p>
            </main>
        </>
    );
}
