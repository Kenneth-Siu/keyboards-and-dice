import React from "react";
import copy from "copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import "./ReadyToStartView.scss";
import { PillButton } from "../../components/pillButton/PillButton";
import { asyncTry } from "../../helpers/asyncTry";
import * as DraftsApi from "../../api/DraftsApi.js";
import { RotatingLoadingIcon } from "../../components/rotatingLoadingIcon/RotatingLoadingIcon";
import { useAutoRefresh } from "../../helpers/useAutoRefresh";

export function ReadyToStartView({ draftId, numberOfBots, getDraft, startDraftCallback, isOwner }) {
    useAutoRefresh(getDraft);

    return (
        <div className="ready-to-start-view">
            {isOwner ? (
                <InviteYourFriendsView draftId={draftId} numberOfBots={numberOfBots} startDraft={startDraft} />
            ) : (
                <WaitingToStartView />
            )}
        </div>
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

function InviteYourFriendsView({ draftId, numberOfBots, startDraft }) {
    return (
        <>
            <p className="invite-your-friends">
                Invite your friends! Send them your draft ID: <span className="mono-space">{draftId}</span>
                <button className="copy" aria-label="Copy" onClick={() => copy(draftId)}>
                    <MdContentCopy />
                </button>
            </p>
            <PillButton onClick={startDraft} className="start-draft">
                Start the draft!
                {numberOfBots > 0 ? ` (With ${numberOfBots} bots)` : ""}
            </PillButton>
        </>
    );
}

function WaitingToStartView() {
    return (
        <>
            <p className="waiting-to-start">Waiting for the owner to start the draft...</p>
            <RotatingLoadingIcon />
        </>
    );
}
