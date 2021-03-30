import copy from "copy-to-clipboard";
import React from "react";
import { MdContentCopy, MdDelete, MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import { PlayerList } from "../../../components/playerList/PlayerList.js";
import "./DraftsTable.scss";

export function DraftsTable({ drafts, loggedInUser, deleteDraft, leaveDraft }) {
    if (!drafts) {
        return null;
    }
    return (
        <table className="drafts-table">
            {drafts.length === 0 ? (
                <tbody>
                    <tr>
                        <td className="no-drafts" colSpan="2">
                            You aren't in any drafts at the moment... <span className="emoji">🌧</span>
                        </td>
                    </tr>
                </tbody>
            ) : (
                <>
                    <thead>
                        <tr>
                            <th>Draft ID</th>
                            <th colSpan="2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drafts
                            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                            .map((draft) => (
                                <DraftsTableRow
                                    key={draft.id}
                                    draft={draft}
                                    loggedInUser={loggedInUser}
                                    deleteDraft={deleteDraft}
                                    leaveDraft={leaveDraft}
                                />
                            ))}
                    </tbody>
                </>
            )}
        </table>
    );
}

function DraftsTableRow({ draft, loggedInUser, deleteDraft, leaveDraft, ...rest }) {
    return (
        <tr {...rest}>
            <td className="draft-id">
                <div>
                    <div className="mono-space">
                        <Link to={`/terra/drafts/${draft.id}`}>{draft.id}</Link>
                    </div>
                    <PlayerList
                        players={draft.players.sort((a, b) => a.seatNumber - b.seatNumber)}
                        loggedInUser={loggedInUser}
                    />
                </div>
            </td>
            <td>{draft.statusName}</td>
            <td className="controls">
                {draft.status === 0 ? (
                    <button title="Copy draft ID" className="copy" aria-label="Copy" onClick={() => copy(draft.id)}>
                        <MdContentCopy />
                    </button>
                ) : null}
                {draft.ownerId === loggedInUser.id ? (
                    <button title="Delete" className="delete" aria-label="Delete" onClick={() => deleteDraft(draft.id)}>
                        <MdDelete />
                    </button>
                ) : (
                    <button
                        title="Leave draft"
                        className="leave"
                        aria-label="Leave draft"
                        onClick={() => leaveDraft(draft.id)}
                    >
                        <MdExitToApp />
                    </button>
                )}
            </td>
        </tr>
    );
}
