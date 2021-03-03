import React, { useState } from "react";
import { Button } from "../../components/button/Button";

export function CopyDeckButton({ copyCallback }) {
    const [deckCopied, setDeckCopied] = useState(false);

    return (
        <Button className={`copy-deck-button${deckCopied ? " deck-copied" : ""}`} onClick={onClick}>
            {deckCopied ? "Deck copied!" : "Copy deck to clipboard"}
        </Button>
    );

    function onClick() {
        copyCallback();
        setDeckCopied(true);
        setTimeout(() => {
            setDeckCopied(false);
        }, 5000);
    }
}
