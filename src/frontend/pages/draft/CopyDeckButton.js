import React, { useState } from "react";
import { PillButton } from "../../components/pillButton/PillButton";
import "./CopyDeckButton.scss";

export function CopyDeckButton({ copyCallback }) {
    const [deckCopied, setDeckCopied] = useState(false);

    return (
        <PillButton className={`copy-deck-button${deckCopied ? " deck-copied" : ""}`} onClick={onClick}>
            {deckCopied ? "Deck copied!" : "Copy deck to clipboard"}
        </PillButton>
    );

    function onClick() {
        copyCallback();
        setDeckCopied(true);
        setTimeout(() => {
            setDeckCopied(false);
        }, 5000);
    }
}
