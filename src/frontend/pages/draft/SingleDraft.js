import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../../config";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import { getCard } from "../../../shared/cardList";
import "./SingleDraft.scss";
import { MdChevronLeft, MdChevronRight, MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";

export default function SingleDraft({ userDisplayName }) {
    const { draftId } = useParams();

    const [draft, setDraft] = useState(null);
    const [booster, setBooster] = useState(null);
    const [cards, setCards] = useState([]);
    const [busy, setBusy] = useState(true);
    useEffect(getDraft, []);

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="single-draft-page">
                <h1>Draft{booster ? ` — Pack ${booster.packNumber} Pick ${booster.pickNumber}` : ""}</h1>
                {busy ? <LoadingSpinner /> : booster ? boosterView() : readyToStartView()}
            </main>
        </>
    );

    function readyToStartView() {
        return (
            <>
                <div className="ready-to-start players">
                    {draft.players
                        .sort((a, b) => a.seatNumber - b.seatNumber)
                        .map((player, index) => (
                            <span
                                className="player-name"
                                key={index}
                                className={`player-name ${
                                    player.displayName === userDisplayName ? "current-user" : ""
                                }`}
                            >
                                {player.displayName}
                            </span>
                        ))}
                </div>
                <p>
                    Invite your friends! Send them your draft ID: <span className="mono-space">{draftId}</span>
                    <button className="copy" aria-label="Copy" onClick={() => copy(draft.id)}>
                        <MdContentCopy />
                    </button>
                </p>
                <button onClick={startDraft} className="start-draft">
                    Start the draft!
                    {draft.players.length < DEFAULT_PLAYERS_IN_DRAFT
                        ? ` (With ${DEFAULT_PLAYERS_IN_DRAFT - draft.players.length} bots)`
                        : ""}
                </button>
            </>
        );
    }

    function boosterView() {
        return (
            <>
                <div className="in-progress players">
                    <span
                        className="player-name"
                        className={`player-name ${
                            draft.players.find((player) => player.seatNumber === draft.players.length - 1)
                                .displayName === userDisplayName
                                ? "current-user"
                                : ""
                        }`}
                    >
                        {draft.players.find((player) => player.seatNumber === draft.players.length - 1).displayName}
                    </span>
                    {draft.players
                        .sort((a, b) => a.seatNumber - b.seatNumber)
                        .map((player, index) => (
                            <>
                                {booster.packNumber === 2 ? <MdChevronRight /> : <MdChevronLeft />}
                                <span
                                    className="player-name"
                                    key={index}
                                    className={`player-name ${
                                        player.displayName === userDisplayName ? "current-user" : ""
                                    }`}
                                >
                                    {player.displayName}
                                </span>
                            </>
                        ))}
                    {booster.packNumber === 2 ? <MdChevronRight /> : <MdChevronLeft />}
                    <span
                        className="player-name"
                        className={`player-name ${
                            draft.players.find((player) => player.seatNumber === 0).displayName === userDisplayName
                                ? "current-user"
                                : ""
                        }`}
                    >
                        {draft.players.find((player) => player.seatNumber === 0).displayName}
                    </span>
                </div>
                <div className="booster">
                    {cards.map((card) => (
                        <img className="card" src={card.imageName} key={card.id} loading="lazy" />
                    ))}
                </div>
            </>
        );
    }

    function getDraft() {
        setBusy(true);
        (async () => {
            try {
                const r = await fetch(`/api/drafts/${draftId}`);
                if (!r.ok) {
                    throw "Response not ok";
                }
                const responseDraft = await r.json();
                setDraft(responseDraft);
                if (responseDraft.status === DRAFT_STATUSES.READY_TO_START) {
                    setBusy(false);
                    return;
                }
                const r2 = await fetch(`/api/drafts/${draftId}/booster`);
                if (!r2.ok) {
                    throw "Response not ok";
                }
                const responseBooster = await r2.json();
                setBooster(responseBooster);
                setCards(responseBooster.cards.map((cardId) => getCard(cardId)));
                setBusy(false);
            } catch (err) {
                // TODO error handling
                setBusy(false);
                console.log(err);
            }
        })();
    }

    function startDraft() {
        setBusy(true);
        (async () => {
            try {
                const r = await fetch(`/api/drafts/${draftId}/start`, { method: "POST" });
                if (!r.ok) {
                    throw "Response not ok";
                }
                getDraft();
            } catch (err) {
                // TODO error handling
                setBusy(false);
                console.log(err);
            }
        })();
    }
}
