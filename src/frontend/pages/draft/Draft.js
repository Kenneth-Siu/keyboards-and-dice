import React, { useEffect, useState } from "react";
import { MdRefresh, MdContentCopy, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.js";
import * as DraftsApi from "../../api/DraftsApi.js";
import "./Draft.scss";
import { asyncTry } from "../../helpers/asyncTry.js";
import PlayerPill from "../../components/playerPill/PlayerPill.js";

export default function Draft({ loggedInUser }) {
    const [drafts, setDrafts] = useState(null);
    const [busy, setBusy] = useState(true);
    const [joinDraftId, setJoinDraftId] = useState("");
    useEffect(getDrafts, []);
    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="draft-page">
                <h1>Draft</h1>
                <p>Hi, {loggedInUser.displayName}!</p>
                {!drafts ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <button className="refresh-button" aria-label="Refresh" onClick={getDrafts} disabled={busy}>
                            <MdRefresh />
                        </button>
                        <DraftsTable />
                        <CreateDraftForm />
                        <JoinDraftForm />
                    </>
                )}
            </main>
        </>
    );

    function DraftsTable() {
        if (!drafts) {
            return null;
        }
        return (
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
                            .map((draft) => <DraftsTableRow draft={draft} key={draft.id} />)
                    )}
                </tbody>
            </table>
        );
    }

    function DraftsTableRow({ draft, ...rest }) {
        return (
            <tr {...rest}>
                <td className="draft-id">
                    <div>
                        <div className="mono-space">
                            <Link to={`/draft/${draft.id}`}>{draft.id}</Link>
                        </div>
                        {draft.players
                            .sort((a, b) => a.seatNumber - b.seatNumber)
                            .map((player, index) => (
                                <PlayerPill player={player} loggedInUserId={loggedInUser.id} key={index} />
                            ))}
                    </div>
                </td>
                <td>{draft.statusName}</td>
                <td className="controls">
                    {draft.status === 0 ? (
                        <button className="copy" aria-label="Copy" onClick={() => copy(draft.id)}>
                            <MdContentCopy />
                        </button>
                    ) : null}
                    <button
                        className="delete"
                        aria-label="Delete"
                        onClick={() => {
                            /* TODO */
                        }}
                    >
                        <MdDelete />
                    </button>
                </td>
            </tr>
        );
    }

    function CreateDraftForm() {
        return (
            <form className="create-draft">
                <button onClick={createDraft} disabled={busy}>
                    Create a draft
                </button>
            </form>
        );
    }

    function JoinDraftForm() {
        return (
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
        );
    }

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
                await DraftsApi.joinDraft(joinDraftId.trim());
                getDrafts();
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
                await DraftsApi.createDraft();
                getDrafts();
            },
            () => {
                setBusy(false);
            }
        );
    }
}
