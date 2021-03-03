import React from "react";
import copy from "copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import "./ReadyToStartView.scss";
import { Button } from "../../components/button/Button";

export function ReadyToStartView({ draftId, numberOfBots, startDraftCallback }) {
    return (
        <>
            <p className="invite-your-friends">
                Invite your friends! Send them your draft ID: <span className="mono-space">{draftId}</span>
                <button className="copy" aria-label="Copy" onClick={() => copy(draftId)}>
                    <MdContentCopy />
                </button>
            </p>
            <Button onClick={startDraft} className="start-draft">
                Start the draft!
                {numberOfBots > 0 ? ` (With ${numberOfBots} bots)` : ""}
            </Button>
        </>
    );

    function startDraft() {
        asyncTry(
            async () => {
                await DraftsApi.startDraft(draftId);
                startDraftCallback();
            },
            () => {}
        );
    }
}
