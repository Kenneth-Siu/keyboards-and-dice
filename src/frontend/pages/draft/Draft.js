import React, { useEffect, useState } from "react";
import { MdRefresh, MdContentCopy, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner.js";
import "./Draft.scss";

export default function Draft({ userDisplayName }) {
    const [drafts, setDrafts] = useState(null);
    const [busy, setBusy] = useState(true);
    const [joinDraftId, setJoinDraftId] = useState("");
    useEffect(getDrafts, []);
    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="draft-page">
                <h1>Draft</h1>
                <p>Hi, {userDisplayName}!</p>
                {!drafts ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <button className="refresh-button" aria-label="Refresh" onClick={getDrafts} disabled={busy}>
                            <MdRefresh />
                        </button>
                        {showDraftsTable(drafts)}
                        {showCreateDraftForm()}
                        {showJoinDraftForm()}
                    </>
                )}
            </main>
        </>
    );

    function showDraftsTable(drafts) {
        if (!drafts) {
            return null;
        }
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Draft ID</th>
                            <th colSpan="2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drafts.length === 0 ? (
                            <tr>
                                <td className="no-drafts" colSpan="2">
                                    You aren't in any drafts at the moment... <span className="emoji">🌧</span>
                                </td>
                            </tr>
                        ) : (
                            drafts
                                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                .map((draft) => (
                                    <tr key={draft.id}>
                                        <td className="draft-id">
                                            <div>
                                                <span className="mono-space">
                                                    <Link to={`/draft/${draft.id}`}>{draft.id}</Link>
                                                </span>
                                                {draft.players
                                                    .sort((a, b) => a.seatNumber - b.seatNumber)
                                                    .map((player) => (
                                                        <span className="player-name">{player.displayName}</span>
                                                    ))}
                                            </div>
                                        </td>
                                        <td>{draft.statusName}</td>
                                        <td className="controls">
                                            {draft.status === 0 ? (
                                                <button
                                                    className="copy"
                                                    aria-label="Copy"
                                                    onClick={() => copy(draft.id)}
                                                >
                                                    <MdContentCopy />
                                                </button>
                                            ) : null}
                                            <button className="delete" aria-label="Delete" onClick={() => {}}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </>
        );
    }

    function showCreateDraftForm() {
        return (
            <form className="create-draft">
                <button onClick={createDraft} disabled={busy}>
                    Create a draft
                </button>
            </form>
        );
    }

    function showJoinDraftForm() {
        return (
            <>
                <form className="join-draft">
                    <label htmlFor="draft-id">Or join a friend's draft:</label>
                    <input
                        id="draft-id"
                        type="text"
                        placeholder="e.g. 718dc651-4c33-4d43-86b7-fe61f59d2f79"
                        value={joinDraftId}
                        onChange={(event) => setJoinDraftId(event.target.value)}
                        disabled={busy}
                    ></input>
                    <button onClick={joinDraft} disabled={busy}>
                        Join
                    </button>
                </form>
            </>
        );
    }

    function getDrafts() {
        setBusy(true);
        (async () => {
            try {
                const r = await fetch("/api/drafts");
                if (!r.ok) {
                    throw "Response not ok";
                }
                const drafts = await r.json();
                setBusy(false);
                setDrafts(drafts);
            } catch (err) {
                setBusy(false);
                // TODO error handling
                console.log(err);
            }
        })();
    }

    function joinDraft() {
        setBusy(true);
        (async () => {
            try {
                const r = await fetch(`/api/drafts/${joinDraftId.trim()}/join`, { method: "PUT" });
                if (!r.ok) {
                    throw "Response not ok";
                }
                getDrafts();
            } catch (err) {
                setBusy(false);
                // TODO error handling
                console.log(err);
            }
        })();
    }

    function createDraft() {
        setBusy(true);
        (async () => {
            try {
                const r = await fetch("/api/drafts", { method: "POST" });
                if (!r.ok) {
                    throw "Response not ok";
                }
                getDrafts();
            } catch (err) {
                setBusy(false);
                // TODO error handling
                console.log(err);
            }
        })();
    }
}
