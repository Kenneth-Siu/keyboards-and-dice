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
    const [busy, setBusy] = useState(true);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
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

    function Chevron() {
        return booster.packNumber === 2 ? <MdChevronRight /> : <MdChevronLeft />;
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
                            setBooster(responseBooster);
                        }
                        setDraft(responseDraft);
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
                await DraftsApi.submitPick(
                    draftId,
                    booster.packNumber,
                    booster.pickNumber,
                    booster.cards[selectedCardIndex].id
                );
                getDraft();
            },
            () => {
                setBusy(false);
            }
        );
    }
}
