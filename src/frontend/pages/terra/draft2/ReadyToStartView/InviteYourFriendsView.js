import React from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

import { DEFAULT_PLAYERS_IN_DRAFT } from "../../../../../config";
import { PillButton } from "../../../../components/pillButton/PillButton";

import "./InviteYourFriendsView.scss";

export default function InviteYourFriendsView({ draft, getDraft }) {
    const { draftId } = useParams();

    const numberOfBots = Math.max(0, DEFAULT_PLAYERS_IN_DRAFT - draft.players.length);

    return (
        <div className="invite-your-friends">
            <p>
                Invite your friends! Send them your draft ID: <span className="mono-space">{draftId}</span>
                <button className="copy" aria-label="Copy" onClick={() => copy(draftId)}>
                    <MdContentCopy />
                </button>
            </p>
            <PillButton onClick={startDraft} className="start-draft">
                Start the draft!
                {numberOfBots > 0 ? ` (With ${numberOfBots} bots)` : ""}
            </PillButton>
        </div>
    );

    function startDraft() {
        asyncTry(
            async () => {
                await DraftsApi.startDraft(draftId);
                getDraft();
            },
            () => {}
        );
    }
}
