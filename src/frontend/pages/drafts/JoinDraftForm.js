import React from "react";
import { PillButton } from "../../components/pillButton/PillButton.js";
import "./JoinDraftForm.scss";

export function JoinDraftForm({ joinDraftId, setJoinDraftId, joinDraft, busy }) {
    return (
        <div className="join-draft">
            <label htmlFor="draft-id">Or join a friend's draft:</label>
            <input
                id="draft-id"
                type="text"
                placeholder="e.g. 718dc651-4c33-4d43-86b7-fe61f59d2f79"
                value={joinDraftId}
                onChange={(event) => setJoinDraftId(event.target.value)}
                disabled={busy}
            ></input>
            <PillButton onClick={joinDraft} disabled={busy}>
                Join
            </PillButton>
        </div>
    );
}
