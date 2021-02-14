import React, { useEffect, useState } from "react";
import { MdRefresh, MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner.js";
import "./Draft.scss";

export default function Draft({ userDisplayName }) {
    const [drafts, setDrafts] = useState(null);
    const [busy, setBusy] = useState(false);
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
                <button className="refresh-button" aria-label="Refresh" onClick={getDrafts} disabled={busy}>
                    <MdRefresh />
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Draft ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drafts.map((draft) => (
                            <tr key={draft.id}>
                                <td className="draft-id">
                                    <span className="mono-space">
                                        {draft.id}
                                        {draft.status === 0 ? (
                                            <button aria-label="Copy" onClick={() => copy(draft.id)}>
                                                <MdContentCopy />
                                            </button>
                                        ) : null}
                                    </span>
                                </td>
                                <td>{draft.statusName}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="join-draft" colSpan="2">
                                Join a draft by pasting the draft ID here:
                                <form>
                                    <input
                                        type="text"
                                        pattern="/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i"
                                        placeholder="e.g. 718dc651-4c33-4d43-86b7-fe61f59d2f79"
                                        value={joinDraftId}
                                        onChange={(event) => setJoinDraftId(event.target.value)}
                                        disabled={busy}
                                    ></input>
                                    <button onClick={joinDraft} disabled={busy}>
                                        Join
                                    </button>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td className="create-draft" colSpan="2">
                                <button onClick={createDraft} disabled={busy}>
                                    Or create your own
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }

    function getDrafts() {
        setBusy(true);
        fetch("/api/drafts")
            .then((response) => {
                return response.json();
            })
            .then((drafts) => {
                setBusy(false);
                return setDrafts(drafts);
            })
            .catch(() => {
                setBusy(false);
                // TODO error message
            });
    }

    function joinDraft() {
        setBusy(true);
        fetch(`/api/drafts/join/${joinDraftId}`, { method: "PUT" })
            .then((response) => {
                setBusy(false);
                if (!response.ok) {
                    throw "Response not ok";
                }
                if (response.status === 404) {
                    // TODO bad session ID message
                }
                getDrafts();
            })
            .catch(() => {
                setBusy(false);
                // TODO error message
            });
    }

    function createDraft() {
        setBusy(true);
        fetch("/api/drafts", { method: "POST" })
            .then((response) => {
                setBusy(false);
                if (!response.ok) {
                    throw "Response not ok";
                }
                getDrafts();
            })
            .catch(() => {
                setBusy(false);
                // TODO error message
            });
    }
}
