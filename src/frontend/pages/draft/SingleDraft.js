import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../../config";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import { getCard } from "../../../shared/cardList";
import * as DraftsApi from "../../api/DraftsApi.js";
import "./SingleDraft.scss";
import { MdChevronLeft, MdChevronRight, MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import { asyncTry } from "../../helpers/asyncTry";

export default function SingleDraft({ loggedInUser }) {
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
                                    player.userId === loggedInUser.id ? "current-user" : ""
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
                                .userId === loggedInUser.id
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
                                        player.userId === loggedInUser.id ? "current-user" : ""
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
                            draft.players.find((player) => player.seatNumber === 0).userId === loggedInUser.id
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
        asyncTry(
            async () => {
                const responseDraft = await DraftsApi.getDraft(draftId);
                setDraft(responseDraft);
                if (responseDraft.status === DRAFT_STATUSES.READY_TO_START) {
                    setBusy(false);
                    return;
                }
                const responseBooster = await DraftsApi.getBooster(draftId);
                setBooster(responseBooster);
                setCards(responseBooster.cards.map((cardId) => getCard(cardId)));
                setBusy(false);
            },
            () => {
                setBusy(false);
            }
        );
    }

    function startDraft() {
        setBusy(true);
        asyncTry(
            async () => {
                getDraft();
            },
            () => {
                setBusy(false);
            }
        );
    }
}
