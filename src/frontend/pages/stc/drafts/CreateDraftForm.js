import React from "react";
import { PillButton } from "../../../components/pillButton/PillButton.js";
import "./CreateDraftForm.scss";

export function CreateDraftForm({ createDraft, busy }) {
    return (
        <div className="create-draft">
            <PillButton onClick={createDraft} disabled={busy}>
                Create a draft
            </PillButton>
        </div>
    );
}