import copy from "copy-to-clipboard";
import React from "react";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { PlayerList } from "../../components/playerList/PlayerList.js";
import "./DraftsTable.scss";

export function DraftsTable({ drafts, loggedInUser, deleteDraft }) {
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
                                />
                            ))}
                    </tbody>
                </>
            )}
        </table>
    );
}

function DraftsTableRow({ draft, loggedInUser, deleteDraft, ...rest }) {
    return (
        <tr {...rest}>
            <td className="draft-id">
                <div>
                    <div className="mono-space">
                        <Link to={`/drafts/${draft.id}`}>{draft.id}</Link>
                    </div>
                    <PlayerList
                        players={draft.players.sort((a, b) => a.seatNumber - b.seatNumber)}
                        loggedInUser={loggedInUser}
                    />
                </div>
            </td>
            <td colSpan={draft.ownerId === loggedInUser.id ? 1 : 2}>{draft.statusName}</td>
            {draft.ownerId === loggedInUser.id && (
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
                            deleteDraft(draft.id);
                        }}
                    >
                        <MdDelete />
                    </button>
                </td>
            )}
        </tr>
    );
}
