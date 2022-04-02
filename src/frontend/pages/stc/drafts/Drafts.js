import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner.js";
import * as DraftsApi from "../../../api/DraftsApi.js";
import { asyncTry } from "../../../helpers/asyncTry.js";
import { CreateDraftForm } from "./CreateDraftForm.js";
import "./Drafts.scss";
import { JoinDraftForm } from "./JoinDraftForm.js";
import { DraftsTable } from "./DraftsTable.js";
import draftSplash from "../../../../../data/draftSplash.jpg";

export default function Drafts({ loggedInUser }) {
    const history = useHistory();
    const [drafts, setDrafts] = useState(null);
    const [busy, setBusy] = useState(true);
    const [joinDraftId, setJoinDraftId] = useState("");
    useEffect(getDrafts, []);
    return (
        <>
            <title>Your Drafts · Space the Convergence</title>
            <main className="drafts-page">
                <div className="background-image-container">
                    <img className="background-image" src={draftSplash} />
                </div>
                <div className="container">
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
                            <DraftsTable
                                drafts={drafts}
                                loggedInUser={loggedInUser}
                                deleteDraft={deleteDraft}
                                leaveDraft={leaveDraft}
                            />
                            <CreateDraftForm createDraft={createDraft} busy={busy} />
                            <JoinDraftForm
                                joinDraftId={joinDraftId}
                                setJoinDraftId={setJoinDraftId}
                                joinDraft={joinDraft}
                                busy={busy}
                            />
                        </>
                    )}
                </div>
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
                history.push(`/stc/drafts/${draftId}`);
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
                history.push(`/stc/drafts/${draftId}`);
            },
            () => {
                setBusy(false);
            }
        );
    }

    function deleteDraft(draftId) {
        if (window.confirm("This will delete the draft. You cannot undo this!")) {
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

    function leaveDraft(draftId) {
        if (window.confirm("You will leave the draft. If the draft has started, you cannot undo this!")) {
            setBusy(true);
            asyncTry(
                async () => {
                    await DraftsApi.leaveDraft(draftId);
                    getDrafts();
                },
                () => {
                    setBusy(false);
                }
            );
        }
    }
}
