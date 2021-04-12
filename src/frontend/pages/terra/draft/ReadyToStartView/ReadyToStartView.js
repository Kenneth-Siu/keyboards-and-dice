import React from "react";

import { useAutoRefresh } from "../../../../helpers/useAutoRefresh";
import InviteYourFriendsView from "./InviteYourFriendsView";
import WaitingToStartView from "./WaitingToStartView";

import "./ReadyToStartView.scss";

export default function ReadyToStartView({ draft, getDraft }) {
    useAutoRefresh(getDraft);

    return (
        <div className="ready-to-start">
            {draft.isOwner ? (
                <InviteYourFriendsView draft={draft} getDraft={getDraft} />
            ) : (
                <WaitingToStartView />
            )}
        </div>
    );
}
