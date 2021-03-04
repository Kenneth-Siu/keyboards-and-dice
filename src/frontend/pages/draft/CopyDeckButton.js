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
            setDeckCopied(false);   // Still triggers if you navigate away from the page.
            // TODO set up unsubscribe in a useEffect cleanup function
        }, 5000);
    }
}
