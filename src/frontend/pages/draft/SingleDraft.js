import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../../config";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.js";
import { getCard } from "../../../shared/cardList";
import * as DraftsApi from "../../api/DraftsApi.js";
import "./SingleDraft.scss";
import { MdChevronLeft, MdChevronRight, MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import { asyncTry } from "../../helpers/asyncTry";
import PlayerPill from "../../components/playerPill/PlayerPill";

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
                {busy ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <PlayerList />
                        {booster ? <BoosterView /> : <ReadyToStartView />}
                    </>
                )}
            </main>
        </>
    );

    function PlayerList() {
        return (
            <div className={`player-list ${booster ? "draft-in-progress" : "ready-to-start"}`}>
                {booster && (
                    <PlayerPill
                        player={draft.sortedPlayers[draft.sortedPlayers.length - 1]}
                        loggedInUserId={loggedInUser.id}
                    />
                )}
                {draft.sortedPlayers.map((player, index) => (
                    <React.Fragment key={index}>
                        {booster && <Chevron />}
                        <PlayerPill player={player} loggedInUserId={loggedInUser.id} />
                    </React.Fragment>
                ))}
                {booster && <Chevron />}
                {booster && <PlayerPill player={draft.sortedPlayers[0]} loggedInUserId={loggedInUser.id} />}
            </div>
        );
    }

    function ReadyToStartView() {
        return (
            <>
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

    function BoosterView() {
        return (
            <div className="booster">
                {cards.map((card) => (
                    <img className="card" src={card.imageName} key={card.id} loading="lazy" />
                ))}
            </div>
        );
    }

    function Chevron() {
        return booster.packNumber === 2 ? <MdChevronRight /> : <MdChevronLeft />;
    }

    function getDraft() {
        setBusy(true);
        asyncTry(
            async () => {
                const responseDraft = await DraftsApi.getDraft(draftId);
                responseDraft.sortedPlayers = responseDraft.players.sort((a, b) => a.seatNumber - b.seatNumber);
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
