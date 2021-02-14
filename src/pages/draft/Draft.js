import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner.js";
import "./Draft.scss";

export default function Draft({ userDisplayName }) {
    const [drafts, setDrafts] = useState(null);
    const [creatingOrJoiningDraft, setCreatingOrJoiningDraft] = useState(false);
    const [joinDraftId, setJoinDraftId] = useState("");
    useEffect(getDrafts, []);
    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="draft-page">
                <h1>Draft</h1>
                <p>Hi, {userDisplayName}!</p>
                {drafts ? null : <LoadingSpinner />}
                {listDrafts(drafts)}
                {drafts ? (
                    <p>
                        Once you've created a draft, invite your friends to your draft by sharing your Draft ID, or join
                        your friend's draft by using their Draft ID.
                    </p>
                ) : null}
            </main>
        </>
    );

    function listDrafts(drafts) {
        if (!drafts) {
            return null;
        }
        return (
            <>
                <button onClick={getDrafts}>Refresh</button>
                <table>
                    <tbody>
                        {drafts.map((draft) => (
                            <tr key={draft.id}>
                                <td>{draft.id}</td>
                                <td>{draft.statusName}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                Join a draft by copying the draft ID here:
                                <input
                                    type="text"
                                    pattern="/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i"
                                    placeholder="e.g. 718dc651-4c33-4d43-86b7-fe61f59d2f79"
                                    value={joinDraftId}
                                    onChange={(event) => setJoinDraftId(event.target.value)}
                                ></input>
                                <button onClick={joinDraft} disabled={creatingOrJoiningDraft}>
                                    Join
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={createDraft} disabled={creatingOrJoiningDraft}>
                                    Or start your own
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }

    function getDrafts() {
        fetch("/api/drafts")
            .then((response) => {
                return response.json();
            })
            .then((drafts) => {
                return setDrafts(drafts);
            });
    }

    function joinDraft() {
        setCreatingOrJoiningDraft(true);
        fetch(`/api/drafts/join/${joinDraftId}`, { method: "PUT" })
            .then((response) => {
                setCreatingOrJoiningDraft(false);
                if (!response.ok) {
                    throw "Response not ok";
                }
                if (response.status === 404) {
                    // TODO bad session ID message
                }
                getDrafts();
            })
            .catch(() => {
                setCreatingOrJoiningDraft(false);
                // TODO error message
            });
    }

    function createDraft() {
        setCreatingOrJoiningDraft(true);
        fetch("/api/drafts", { method: "POST" })
            .then((response) => {
                setCreatingOrJoiningDraft(false);
                if (!response.ok) {
                    throw "Response not ok";
                }
                getDrafts();
            })
            .catch(() => {
                setCreatingOrJoiningDraft(false);
                // TODO error message
            });
    }
}
