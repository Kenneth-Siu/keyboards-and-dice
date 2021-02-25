import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../../config";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.js";
import { getCard } from "../../../shared/cardList";
import * as DraftsApi from "../../api/DraftsApi.js";
import "./SingleDraft.scss";
import { MdChevronLeft, MdChevronRight, MdContentCopy, MdRefresh } from "react-icons/md";
import copy from "copy-to-clipboard";
import { asyncTry } from "../../helpers/asyncTry";
import PlayerPill from "../../components/playerPill/PlayerPill";

export default function SingleDraft({ loggedInUser }) {
    const { draftId } = useParams();

    const [draft, setDraft] = useState(null);
    const [booster, setBooster] = useState(null);
    const [picks, setPicks] = useState([]);
    const [busy, setBusy] = useState(true);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    useEffect(getDraft, []);

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="single-draft-page">
                <h1>
                    Draft
                    {draft && draft.status === DRAFT_STATUSES.IN_PROGRESS
                        ? ` — Pack ${draft.packNumber}${booster ? `, Pick ${booster.pickNumber}` : ""}`
                        : ""}
                </h1>
                {draft && <PlayerList />}
                <MainView />
            </main>
        </>
    );

    function MainView() {
        if (busy) {
            return <LoadingSpinner />;
        }
        if (draft.status === DRAFT_STATUSES.READY_TO_START) {
            return <ReadyToStartView />;
        }
        return (
            <>
                {booster ? <BoosterView /> : <RefreshButtonView />}
                <PicksView />
            </>
        );
    }

    function PlayerList() {
        const draftInProgress = draft.status === DRAFT_STATUSES.IN_PROGRESS;
        return (
            <div className={`player-list ${draftInProgress ? "draft-in-progress" : "ready-to-start"}`}>
                {draftInProgress && (
                    <PlayerPill
                        player={draft.sortedPlayers[draft.sortedPlayers.length - 1]}
                        loggedInUserId={loggedInUser.id}
                    />
                )}
                {draft.sortedPlayers.map((player, index) => (
                    <React.Fragment key={index}>
                        {draftInProgress && <Chevron />}
                        <PlayerPill player={player} loggedInUserId={loggedInUser.id} />
                    </React.Fragment>
                ))}
                {draftInProgress && <Chevron />}
                {draftInProgress && <PlayerPill player={draft.sortedPlayers[0]} loggedInUserId={loggedInUser.id} />}
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
            <>
                <div className="booster">
                    {booster.cards.map((card, index) => (
                        <button
                            onClick={() => setSelectedCardIndex(index)}
                            key={index}
                            className={`${selectedCardIndex === index ? "selected" : ""}`}
                        >
                            <img className="card" src={card.imageName} loading="lazy" />
                        </button>
                    ))}
                </div>
                <button onClick={submitPick} className="submit-pick" disabled={selectedCardIndex === null}>
                    Submit Pick
                </button>
            </>
        );
    }

    function RefreshButtonView() {
        return (
            <div className="refresh-button-view">
                <h2>Waiting for others to make their picks...</h2>
                <button className="refresh-button" aria-label="Refresh" onClick={getDraft} disabled={busy}>
                    <MdRefresh />
                </button>
            </div>
        );
    }

    function PicksView() {
        return (
            <div className="picks-view">
                <h1>Deck</h1>
                <div className="picks">
                    {picks.map((pick) => (
                        <img key={pick.id} src={pick.imageName} loading="lazy" />
                    ))}
                </div>
            </div>
        );
    }

    function Chevron() {
        return draft.packNumber === 2 ? <MdChevronRight /> : <MdChevronLeft />;
    }

    function getDraft() {
        setBusy(true);
        asyncTry(
            async () => {
                const responseDraft = await DraftsApi.getDraft(draftId);
                responseDraft.sortedPlayers = responseDraft.players.sort((a, b) => a.seatNumber - b.seatNumber);

                switch (responseDraft.status) {
                    case DRAFT_STATUSES.READY_TO_START:
                        setDraft(responseDraft);
                        break;

                    case DRAFT_STATUSES.IN_PROGRESS:
                        const responseBooster = await DraftsApi.getBooster(draftId);
                        if (responseBooster.cards) {
                            responseBooster.cards = responseBooster.cards.map((cardId) => getCard(cardId));
                        }
                        const responsePicks = await DraftsApi.getPicks(draftId);
                        setDraft(responseDraft);
                        responseBooster.cards && setBooster(responseBooster);
                        setPicks(responsePicks.map((cardId) => getCard(cardId)));
                        break;

                    case DRAFT_STATUSES.COMPLETE:
                        break;

                    default:
                        break;
                }
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
                await DraftsApi.startDraft(draftId);
                getDraft();
            },
            () => {
                setBusy(false);
            }
        );
    }

    function submitPick() {
        setBusy(true);
        asyncTry(
            async () => {
                await DraftsApi.submitPick(draftId, booster.pickNumber, booster.cards[selectedCardIndex].id);
                getDraft();
            },
            () => {
                setBusy(false);
            }
        );
    }
}
