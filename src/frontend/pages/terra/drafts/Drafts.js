import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner.js";
import * as DraftsApi from "../../../api/DraftsApi.js";
import { asyncTry } from "../../../helpers/asyncTry.js";
import { CreateDraftForm } from "./CreateDraftForm.js";
import "./Drafts.scss";
import { JoinDraftForm } from "./JoinDraftForm.js";
import { DraftsTable } from "./DraftsTable.js";

export default function Drafts({ loggedInUser }) {
    const history = useHistory();
    const [drafts, setDrafts] = useState(null);
    const [busy, setBusy] = useState(true);
    const [joinDraftId, setJoinDraftId] = useState("");
    useEffect(getDrafts, []);
    return (
        <>
            <title>Your Drafts · Terra 2170</title>
            <main className="draft-page">
                <h1>Your Drafts</h1>
                <p>
                    Hi, {loggedInUser.displayName}!{" "}
                    <small>
                        If this is not you, <a href="/api/logout">log out here</a>.
                    </small>
                </p>
                {!drafts ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <DraftsTable drafts={drafts} loggedInUser={loggedInUser} deleteDraft={deleteDraft} />
                        <CreateDraftForm createDraft={createDraft} busy={busy} />
                        <JoinDraftForm
                            joinDraftId={joinDraftId}
                            setJoinDraftId={setJoinDraftId}
                            joinDraft={joinDraft}
                            busy={busy}
                        />
                    </>
                )}
            </main>
        </>
    );

    function getDrafts() {
        setBusy(true);
        asyncTry(
            async () => {
                const drafts = await DraftsApi.getDrafts();
                setBusy(false);
                setDrafts(drafts);
            },
            () => {
                setBusy(false);
            }
        );
    }

    function joinDraft() {
        setBusy(true);
        asyncTry(
            async () => {
                const draftId = joinDraftId.trim();
                await DraftsApi.joinDraft(draftId);
                history.push(`/terra/drafts/${draftId}`);
            },
            () => {
                setBusy(false);
            }
        );
    }

    function createDraft() {
        setBusy(true);
        asyncTry(
            async () => {
                const { draftId } = await DraftsApi.createDraft();
                history.push(`/terra/drafts/${draftId}`);
            },
            () => {
                setBusy(false);
            }
        );
    }

    function deleteDraft(draftId) {
        setBusy(true);
        asyncTry(
            async () => {
                await DraftsApi.deleteDraft(draftId);
                getDrafts();
            },
            () => {
                setBusy(false);
            }
        );
    }
}
