import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../../config";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.js";
import { getCard } from "../../../shared/cardList";
import * as DraftsApi from "../../api/DraftsApi.js";
import "./SingleDraft.scss";
import {
    MdAddCircleOutline,
    MdChevronLeft,
    MdChevronRight,
    MdContentCopy,
    MdRefresh,
    MdRemoveCircleOutline,
} from "react-icons/md";
import copy from "copy-to-clipboard";
import { asyncTry } from "../../helpers/asyncTry";
import PlayerPill from "../../components/playerPill/PlayerPill";
import { flattenDeep } from "lodash";
import whiteManaSymbol from "../../../../data/whiteManaSymbol.svg";
import blueManaSymbol from "../../../../data/blueManaSymbol.svg";
import blackManaSymbol from "../../../../data/blackManaSymbol.svg";
import redManaSymbol from "../../../../data/redManaSymbol.svg";
import greenManaSymbol from "../../../../data/greenManaSymbol.svg";
import * as CookieHelper from "../../helpers/CookieHelper.js";

export default function SingleDraft({ loggedInUser }) {
    const { draftId } = useParams();

    const [piles, setPiles] = useState({
        deckRow0: [[], [], [], [], [], [], [], []],
        deckRow1: [[], [], [], [], [], [], [], []],
        sideboardRow0: [[], [], [], [], [], [], [], []],
        sideboardRow1: [[], [], [], [], [], [], [], []],
    });
    const [picksLoadedBefore, setPicksLoadedBefore] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [deckCopied, setDeckCopied] = useState(false);

    const [numberOfPlains, setNumberOfPlains] = useState(0);
    const [numberOfIslands, setNumberOfIslands] = useState(0);
    const [numberOfSwamps, setNumberOfSwamps] = useState(0);
    const [numberOfMountains, setNumberOfMountains] = useState(0);
    const [numberOfForests, setNumberOfForests] = useState(0);

    const [firstTimeDraftLoading, setFirstTimeDraftLoading] = useState(true);
    const [boosterLoading, setBoosterLoading] = useState(false);
    const [picksLoading, setPicksLoading] = useState(false);
    const [playersInSeatOrder, setPlayersInSeatOrder] = useState([]);
    const [draftStatus, setDraftStatus] = useState(null);
    const [boosterCards, setBoosterCards] = useState(null);
    const [packNumber, setPackNumber] = useState(null);
    const [pickNumber, setPickNumber] = useState(null);

    useEffect(getDraft, []);

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="single-draft-page">
                <h1>
                    Draft
                    {draftStatus === DRAFT_STATUSES.IN_PROGRESS
                        ? ` — Pack ${packNumber}${pickNumber !== null ? `, Pick ${pickNumber}` : ""}`
                        : ""}
                    {draftStatus === DRAFT_STATUSES.COMPLETE ? " Complete!" : ""}
                </h1>
                {firstTimeDraftLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <PlayerList />
                        <MainView />
                    </>
                )}
            </main>
        </>
    );

    function MainView() {
        if (draftStatus === DRAFT_STATUSES.READY_TO_START) {
            return <ReadyToStartView />;
        }
        if (draftStatus === DRAFT_STATUSES.COMPLETE) {
            return picksLoading ? <LoadingSpinner /> : <DeckView />;
        }
        return (
            <>
                {boosterLoading ? <LoadingSpinner /> : boosterCards ? <BoosterView /> : <RefreshButtonView />}
                {picksLoading ? <LoadingSpinner /> : <DeckView />}
            </>
        );
    }

    function PlayerList() {
        const isDraftInProgress = draftStatus === DRAFT_STATUSES.IN_PROGRESS;
        return (
            <div className={`player-list ${isDraftInProgress ? "draft-in-progress" : "ready-to-start"}`}>
                {isDraftInProgress && (
                    <PlayerPill
                        player={playersInSeatOrder[playersInSeatOrder.length - 1]}
                        loggedInUserId={loggedInUser.id}
                    />
                )}
                {playersInSeatOrder.map((player, index) => (
                    <React.Fragment key={index}>
                        {isDraftInProgress && <Chevron />}
                        <PlayerPill player={player} loggedInUserId={loggedInUser.id} />
                    </React.Fragment>
                ))}
                {isDraftInProgress && <Chevron />}
                {isDraftInProgress && <PlayerPill player={playersInSeatOrder[0]} loggedInUserId={loggedInUser.id} />}
            </div>
        );
    }

    function ReadyToStartView() {
        return (
            <>
                <p>
                    Invite your friends! Send them your draft ID: <span className="mono-space">{draftId}</span>
                    <button className="copy" aria-label="Copy" onClick={() => copy(draftId)}>
                        <MdContentCopy />
                    </button>
                </p>
                <button onClick={startDraft} className="start-draft">
                    Start the draft!
                    {playersInSeatOrder.length < DEFAULT_PLAYERS_IN_DRAFT
                        ? ` (With ${DEFAULT_PLAYERS_IN_DRAFT - playersInSeatOrder.length} bots)`
                        : ""}
                </button>
            </>
        );
    }

    function BoosterView() {
        return (
            <>
                <div className="booster">
                    {boosterCards.map((card, index) => (
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
                <button className="refresh-button" aria-label="Refresh" onClick={getDraft}>
                    <MdRefresh />
                </button>
            </div>
        );
    }

    function BasicLandControl({ iconUrl, landState, setLandState }) {
        return (
            <div className="basic-control">
                <button onClick={() => setLandState(landState - 1)} disabled={landState <= 0}>
                    <MdRemoveCircleOutline />
                </button>
                <div className="symbol-div">
                    <img src={iconUrl} className={landState > 0 ? "fade" : ""} />
                    {landState > 0 ? landState : ""}
                </div>
                <button onClick={() => setLandState(landState + 1)}>
                    <MdAddCircleOutline />
                </button>
            </div>
        );
    }

    function DeckView() {
        return (
            <div className="deck-view">
                <div className="deck-heading">
                    <h1>
                        Deck{" "}
                        <small>
                            ({flattenDeep(piles.deckRow0).length + flattenDeep(piles.deckRow1).length} cards
                            {totalBasics() > 0 ? `, ${totalBasics()} basics` : ""})
                        </small>
                    </h1>
                    {draftStatus === DRAFT_STATUSES.COMPLETE && (
                        <>
                            <BasicsControlPanel />
                            <CopyDeckButton />
                        </>
                    )}
                </div>
                <CardRow row={piles.deckRow0} cardOnClick={moveToCreatureSideboard} />
                <CardRow row={piles.deckRow1} cardOnClick={moveToNonCreatureSideboard} />
                <div className="deck-heading">
                    <h1>
                        Sideboard{" "}
                        <small>
                            ({flattenDeep(piles.sideboardRow0).length + flattenDeep(piles.sideboardRow1).length} cards)
                        </small>
                    </h1>
                </div>
                <CardRow row={piles.sideboardRow0} cardOnClick={moveToCreatureDeck} />
                <CardRow row={piles.sideboardRow1} cardOnClick={moveToNonCreatureDeck} />
            </div>
        );
    }

    function BasicsControlPanel() {
        return (
            <div className="basics-control-panel">
                Basic lands:
                <BasicLandControl iconUrl={whiteManaSymbol} landState={numberOfPlains} setLandState={setPlains} />
                <BasicLandControl iconUrl={blueManaSymbol} landState={numberOfIslands} setLandState={setIslands} />
                <BasicLandControl iconUrl={blackManaSymbol} landState={numberOfSwamps} setLandState={setSwamps} />
                <BasicLandControl iconUrl={redManaSymbol} landState={numberOfMountains} setLandState={setMountains} />
                <BasicLandControl iconUrl={greenManaSymbol} landState={numberOfForests} setLandState={setForests} />
            </div>
        );
    }

    function CopyDeckButton() {
        return (
            <button className={`copy-deck-button${deckCopied ? " deck-copied" : ""}`} onClick={copyDeck}>
                {deckCopied ? "Deck copied!" : "Copy deck to clipboard"}
            </button>
        );
    }

    function CardRow({ row, cardOnClick }) {
        const nameBarHeight = 1.85;
        const cardHeight = 16.664;
        return (
            <div className="card-row">
                {row.map((pile, pileIndex) => (
                    <div
                        key={pileIndex}
                        className="column"
                        style={{ height: `${Math.max(0, pile.length - 1) * nameBarHeight + cardHeight}vw` }}
                    >
                        {pile.map((pick, pickIndex) => (
                            <div
                                key={pickIndex}
                                className="card"
                                style={{
                                    top: `${pickIndex * nameBarHeight}vw`,
                                    height: `${pickIndex === pile.length - 1 ? cardHeight : nameBarHeight}vw`,
                                }}
                                onClick={() => cardOnClick(pileIndex, pickIndex)}
                            >
                                <img src={pick.imageName} loading="lazy" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    function Chevron() {
        return packNumber === 2 ? <MdChevronRight /> : <MdChevronLeft />;
    }

    function setPlains(num) {
        setNumberOfPlains(num);
        updateCookie(piles, [num, numberOfIslands, numberOfSwamps, numberOfMountains, numberOfForests]);
    }

    function setIslands(num) {
        setNumberOfIslands(num);
        updateCookie(piles, [numberOfPlains, num, numberOfSwamps, numberOfMountains, numberOfForests]);
    }

    function setSwamps(num) {
        setNumberOfSwamps(num);
        updateCookie(piles, [numberOfPlains, numberOfIslands, num, numberOfMountains, numberOfForests]);
    }

    function setMountains(num) {
        setNumberOfMountains(num);
        updateCookie(piles, [numberOfPlains, numberOfIslands, numberOfSwamps, num, numberOfForests]);
    }

    function setForests(num) {
        setNumberOfForests(num);
        updateCookie(piles, [numberOfPlains, numberOfIslands, numberOfSwamps, numberOfMountains, num]);
    }

    function totalBasics() {
        return numberOfPlains + numberOfIslands + numberOfSwamps + numberOfMountains + numberOfForests;
    }

    function copyDeck() {
        const mainBoard = [...flattenDeep(piles.deckRow0), ...flattenDeep(piles.deckRow1)].map(
            (card) => `1 ${card.name}`
        );
        if (numberOfPlains) {
            mainBoard.push(`${numberOfPlains} Plains`);
        }
        if (numberOfIslands) {
            mainBoard.push(`${numberOfIslands} Island`);
        }
        if (numberOfSwamps) {
            mainBoard.push(`${numberOfSwamps} Swamp`);
        }
        if (numberOfMountains) {
            mainBoard.push(`${numberOfMountains} Mountain`);
        }
        if (numberOfForests) {
            mainBoard.push(`${numberOfForests} Forest`);
        }
        const sideBoard = [...flattenDeep(piles.sideboardRow0), ...flattenDeep(piles.sideboardRow1)].map(
            (card) => `1 ${card.name}`
        );
        sideBoard.push("10 Plains", "10 Island", "10 Swamp", "10 Mountain", "10 Forest");

        copy(mainBoard.join("\n") + "\n\n" + sideBoard.join("\n"));

        setDeckCopied(true);
        setTimeout(() => {
            setDeckCopied(false);
        }, 5000);
    }

    function getDraft() {
        asyncTry(
            async () => {
                const responseDraft = await DraftsApi.getDraft(draftId);
                setPlayersInSeatOrder(responseDraft.players.sort((a, b) => a.seatNumber - b.seatNumber));
                setDraftStatus(responseDraft.status);
                setPackNumber(responseDraft.packNumber);
                setFirstTimeDraftLoading(false);

                switch (responseDraft.status) {
                    case DRAFT_STATUSES.READY_TO_START:
                        break;

                    case DRAFT_STATUSES.IN_PROGRESS:
                        getBooster();
                        if (!picksLoadedBefore) {
                            getPicks();
                        }
                        break;

                    case DRAFT_STATUSES.COMPLETE:
                        if (!picksLoadedBefore) {
                            getPicks();
                        }
                        break;

                    default:
                        break;
                }
            },
            () => {
                setBoosterLoading(false);
            }
        );
    }

    function getBooster() {
        setBoosterLoading(true);
        asyncTry(
            async () => {
                const response = await DraftsApi.getBooster(draftId);
                if (response.cards) {
                    setBoosterCards(response.cards.map((cardId) => getCard(cardId)));
                }
                if (response.pickNumber !== undefined) {
                    setPickNumber(response.pickNumber);
                }
                setBoosterLoading(false);
            },
            () => {
                setBoosterLoading(false);
            }
        );
    }

    function getPicks() {
        setPicksLoading(true);
        asyncTry(
            async () => {
                const responsePicks = await DraftsApi.getPicks(draftId);
                updatePicksState(responsePicks.map((cardId) => getCard(cardId)));
                setPicksLoadedBefore(true);
                setPicksLoading(false);
            },
            () => {
                setPicksLoading(false);
            }
        );
    }

    function startDraft() {
        asyncTry(
            async () => {
                await DraftsApi.startDraft(draftId);
                getDraft();
            },
            () => {}
        );
    }

    function submitPick() {
        setBoosterLoading(true);
        asyncTry(
            async () => {
                const submittedCard = boosterCards[selectedCardIndex];
                await DraftsApi.submitPick(draftId, pickNumber, submittedCard.id);
                setSelectedCardIndex(null);
                const column = submittedCard.manaValue === 0 ? 7 : Math.min(6, submittedCard.manaValue - 1);
                if (submittedCard.type.includes("Creature")) {
                    piles.deckRow0[column].push(submittedCard);
                } else {
                    piles.deckRow1[column].push(submittedCard);
                }
                setPiles({ ...piles });
                updateCookie(piles);
                getDraft();
            },
            () => {
                setBoosterLoading(false);
            }
        );
    }

    function updateCookie(pileToUse, lands) {
        const cookiePiles = {
            deckRow0: pileToUse.deckRow0.map((column) => column.map((card) => card.id)),
            deckRow1: pileToUse.deckRow1.map((column) => column.map((card) => card.id)),
            sideboardRow0: pileToUse.sideboardRow0.map((column) => column.map((card) => card.id)),
            sideboardRow1: pileToUse.sideboardRow1.map((column) => column.map((card) => card.id)),
            lands: lands,
        };
        CookieHelper.set(`draft-${draftId}`, cookiePiles);
    }

    function updatePicksState(cards) {
        const cookiePilesOfCardIds = CookieHelper.get(`draft-${draftId}`, {
            deckRow0: [[], [], [], [], [], [], [], []],
            deckRow1: [[], [], [], [], [], [], [], []],
            sideboardRow0: [[], [], [], [], [], [], [], []],
            sideboardRow1: [[], [], [], [], [], [], [], []],
            lands: [0, 0, 0, 0, 0],
        });
        const cookiePiles = {
            deckRow0: cookiePilesOfCardIds.deckRow0.map((column) => column.map((cardId) => getCard(cardId))),
            deckRow1: cookiePilesOfCardIds.deckRow1.map((column) => column.map((cardId) => getCard(cardId))),
            sideboardRow0: cookiePilesOfCardIds.sideboardRow0.map((column) => column.map((cardId) => getCard(cardId))),
            sideboardRow1: cookiePilesOfCardIds.sideboardRow1.map((column) => column.map((cardId) => getCard(cardId))),
        };
        const lands = cookiePilesOfCardIds.lands;
        if (lands) {
            setNumberOfPlains(lands[0]);
            setNumberOfIslands(lands[1]);
            setNumberOfSwamps(lands[2]);
            setNumberOfMountains(lands[3]);
            setNumberOfForests(lands[4]);
        }

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

    function moveToCreatureSideboard(column, row) {
        piles.sideboardRow0[column].push(piles.deckRow0[column][row]);
        piles.deckRow0[column].splice(row, 1);
        setPiles({ ...piles });
        updateCookie(piles);
    }

    function moveToNonCreatureSideboard(column, row) {
        piles.sideboardRow1[column].push(piles.deckRow1[column][row]);
        piles.deckRow1[column].splice(row, 1);
        setPiles({ ...piles });
        updateCookie(piles);
    }

    function moveToCreatureDeck(column, row) {
        piles.deckRow0[column].push(piles.sideboardRow0[column][row]);
        piles.sideboardRow0[column].splice(row, 1);
        setPiles({ ...piles });
        updateCookie(piles);
    }

    function moveToNonCreatureDeck(column, row) {
        piles.deckRow1[column].push(piles.sideboardRow1[column][row]);
        piles.sideboardRow1[column].splice(row, 1);
        setPiles({ ...piles });
        updateCookie(piles);
    }
}
