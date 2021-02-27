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
import { flattenDeep } from "lodash";

export default function SingleDraft({ loggedInUser }) {
    const { draftId } = useParams();

    const [draft, setDraft] = useState(null);
    const [booster, setBooster] = useState(null);
    const [piles, setPiles] = useState({
        deckRow0: [[], [], [], [], [], [], [], []],
        deckRow1: [[], [], [], [], [], [], [], []],
        sideboardRow0: [[], [], [], [], [], [], [], []],
        sideboardRow1: [[], [], [], [], [], [], [], []],
    });
    const [picksLoadedBefore, setPicksLoadedBefore] = useState(false);
    const [draftBusy, setDraftBusy] = useState(true);
    const [picksBusy, setPicksBusy] = useState(true);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    useEffect(getDraft, []);

    function isBusy() {
        return draftBusy || picksBusy;
    }

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="single-draft-page">
                <h1>
                    Draft
                    {draft && draft.status === DRAFT_STATUSES.IN_PROGRESS
                        ? ` — Pack ${draft.packNumber}${
                              booster && booster.pickNumber ? `, Pick ${booster.pickNumber}` : ""
                          }`
                        : ""}
                </h1>
                {draft && <PlayerList />}
                <MainView />
            </main>
        </>
    );

    function MainView() {
        if (isBusy()) {
            return <LoadingSpinner />;
        }
        if (draft.status === DRAFT_STATUSES.READY_TO_START) {
            return <ReadyToStartView />;
        }
        if (draft.status === DRAFT_STATUSES.COMPLETE) {
            return <DeckView />;
        }
        return (
            <>
                {booster.cards ? <BoosterView /> : <RefreshButtonView />}
                <DeckView />
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
                <button className="refresh-button" aria-label="Refresh" onClick={getDraft} disabled={isBusy()}>
                    <MdRefresh />
                </button>
            </div>
        );
    }

    function DeckView() {
        return (
            <div className="deck-view">
                <h1>Deck</h1>
                <div className="row">
                    {piles.deckRow0.map((pile, pileIndex) => (
                        <div
                            key={pileIndex}
                            className="column"
                            style={{ height: `${Math.max(0, pile.length - 1) * 1.85 + 16.664}vw` }}
                        >
                            {pile.map((pick, pickIndex) => (
                                <div
                                    key={pickIndex}
                                    className="card"
                                    style={{ top: `${pickIndex * 1.85}vw`, height: `1.85vw` }}
                                >
                                    <img src={pick.imageName} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="row">
                    {piles.deckRow1.map((pile, pileIndex) => (
                        <div
                            key={pileIndex}
                            className="column"
                            style={{ height: `${Math.max(0, pile.length - 1) * 1.85 + 16.664}vw` }}
                        >
                            {pile.map((pick, pickIndex) => (
                                <div
                                    key={pickIndex}
                                    className="card"
                                    style={{ top: `${pickIndex * 1.85}vw`, height: `1.85vw` }}
                                >
                                    <img src={pick.imageName} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <h1>Sideboard</h1>
                <div className="row">
                    {piles.sideboardRow0.map((pile, pileIndex) => (
                        <div
                            key={pileIndex}
                            className="column"
                            style={{ height: `${Math.max(0, pile.length - 1) * 1.85 + 16.664}vw` }}
                        >
                            {pile.map((pick, pickIndex) => (
                                <div
                                    key={pickIndex}
                                    className="card"
                                    style={{ top: `${pickIndex * 1.85}vw`, height: `1.85vw` }}
                                >
                                    <img src={pick.imageName} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="row">
                    {piles.sideboardRow1.map((pile, pileIndex) => (
                        <div
                            key={pileIndex}
                            className="column"
                            style={{ height: `${Math.max(0, pile.length - 1) * 1.85 + 16.664}vw` }}
                        >
                            {pile.map((pick, pickIndex) => (
                                <div
                                    key={pickIndex}
                                    className="card"
                                    style={{ top: `${pickIndex * 1.85}vw`, height: `1.85vw` }}
                                >
                                    <img src={pick.imageName} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function Chevron() {
        return draft.packNumber === 2 ? <MdChevronRight /> : <MdChevronLeft />;
    }

    function getDraft() {
        setDraftBusy(true);
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
                        setDraft(responseDraft);
                        setBooster(responseBooster);
                        if (!picksLoadedBefore) {
                            getPicks();
                        }
                        break;

                    case DRAFT_STATUSES.COMPLETE:
                        setDraft(responseDraft);
                        break;

                    default:
                        break;
                }
                setDraftBusy(false);
            },
            () => {
                setDraftBusy(false);
            }
        );
    }

    function getPicks() {
        setPicksBusy(true);
        asyncTry(
            async () => {
                const responsePicks = await DraftsApi.getPicks(draftId);
                updatePicksState(responsePicks.map((cardId) => getCard(cardId)));
                setPicksLoadedBefore(true);
                setPicksBusy(false);
            },
            () => {
                setPicksBusy(false);
            }
        );
    }

    function startDraft() {
        setDraftBusy(true);
        asyncTry(
            async () => {
                await DraftsApi.startDraft(draftId);
                getDraft();
            },
            () => {
                setDraftBusy(false);
            }
        );
    }

    function submitPick() {
        setDraftBusy(true);
        asyncTry(
            async () => {
                const submittedCard = booster.cards[selectedCardIndex];
                await DraftsApi.submitPick(draftId, booster.pickNumber, submittedCard.id);
                setSelectedCardIndex(null);
                const column = submittedCard.manaValue === 0 ? 7 : Math.min(6, submittedCard.manaValue - 1);
                if (submittedCard.type.includes("Creature")) {
                    piles.deckRow0[column].push(submittedCard);
                } else {
                    piles.deckRow1[column].push(submittedCard);
                }
                setPiles(piles);
                updateCookie();
                getDraft();
            },
            () => {
                setDraftBusy(false);
            }
        );
    }

    function updateCookie() {
        const cookiePiles = {
            deckRow0: piles.deckRow0.map((column) => column.map((card) => card.id)),
            deckRow1: piles.deckRow1.map((column) => column.map((card) => card.id)),
            sideboardRow0: piles.sideboardRow0.map((column) => column.map((card) => card.id)),
            sideboardRow1: piles.sideboardRow1.map((column) => column.map((card) => card.id)),
        };
        document.cookie = `draft-${draftId}=${JSON.stringify(cookiePiles)}`;
    }

    function updatePicksState(cards) {
        const storedJson = document.cookie.split("; ").find((row) => row.startsWith(`draft-${draftId}=`));
        if (!storedJson) {
            const tempPiles = {
                deckRow0: [[], [], [], [], [], [], [], []],
                deckRow1: [[], [], [], [], [], [], [], []],
                sideboardRow0: [[], [], [], [], [], [], [], []],
                sideboardRow1: [[], [], [], [], [], [], [], []],
            };
            cards.forEach((card) => {
                console.log(card);
                const column = card.manaValue === 0 ? 7 : Math.min(6, card.manaValue - 1);
                if (card.type.includes("Creature")) {
                    tempPiles.deckRow0[column].push(card);
                } else {
                    tempPiles.deckRow1[column].push(card);
                }
            });
            setPiles(tempPiles);
            return;
        }
        const jsonPiles = JSON.parse(storedJson.split("=")[1]);
        const cookiePiles = {
            deckRow0: jsonPiles.deckRow0.map((column) => column.map((cardId) => getCard(cardId))),
            deckRow1: jsonPiles.deckRow1.map((column) => column.map((cardId) => getCard(cardId))),
            sideboardRow0: jsonPiles.sideboardRow0.map((column) => column.map((cardId) => getCard(cardId))),
            sideboardRow1: jsonPiles.sideboardRow1.map((column) => column.map((cardId) => getCard(cardId))),
        };

        // Figure out missing cards
        const cookieCards = [
            ...flattenDeep(cookiePiles.deckRow0),
            ...flattenDeep(cookiePiles.deckRow1),
            ...flattenDeep(cookiePiles.sideboardRow0),
            ...flattenDeep(cookiePiles.sideboardRow1),
        ];
        const missingCards = [];
        while (cards.length) {
            const card = cards.shift();
            const index = cookieCards.findIndex((cookieCard) => cookieCard.id === card.id);
            if (index !== -1) {
                cookieCards.splice(index, 1);
            } else {
                missingCards.push(card);
            }
        }
        missingCards.forEach((card) => {
            const column = card.manaValue === 0 ? 7 : Math.min(6, card.manaValue - 1);
            if (card.type.includes("Creature")) {
                cookiePiles.deckRow0[column].push(card);
            } else {
                cookiePiles.deckRow1[column].push(card);
            }
        });
        setPiles(cookiePiles);
    }
}
