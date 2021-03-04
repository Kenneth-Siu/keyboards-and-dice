import React, { useEffect, useRef, useState } from "react";
import { PillButton } from "../../components/pillButton/PillButton";
import "./CopyDeckButton.scss";

export function CopyDeckButton({ copyCallback }) {
    const [deckCopied, setDeckCopied] = useState(false);
    const timeoutRef = useRef();

    const confirmationMessageDuration = 5000;

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <PillButton className={`copy-deck-button${deckCopied ? " deck-copied" : ""}`} onClick={onClick}>
            {deckCopied ? "Deck copied!" : "Copy deck to clipboard"}
        </PillButton>
    );

    function onClick() {
        copyCallback();
        if (deckCopied) {
            clearTimeout(timeoutRef.current);
        }
        setDeckCopied(true);
        timeoutRef.current = setTimeout(() => {
            setDeckCopied(false);
        }, confirmationMessageDuration);
    }
}
