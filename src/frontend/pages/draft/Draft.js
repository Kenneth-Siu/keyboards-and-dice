import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../../config";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.js";
import { getCard } from "../../../shared/cardList";
import * as DraftsApi from "../../api/DraftsApi.js";
import "./Draft.scss";
import { MdRefresh } from "react-icons/md";
import { asyncTry } from "../../helpers/asyncTry";
import { CHEVRON_DIRECTION, PlayerList } from "../../components/playerList/PlayerList";
import { ReadyToStartView } from "./ReadyToStartView";
import { Button } from "../../components/button/Button";
import { PicksView } from "./PicksView";
import { BasicsControlPanel } from "./BasicsControlPanel";
import { flatten } from "lodash";
import copy from "copy-to-clipboard";

export default function SingleDraft({ loggedInUser }) {
    const { draftId } = useParams();

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const [picks, setPicks] = useState({
        deckCreatures: [[], [], [], [], [], [], [], []],
        deckNonCreatures: [[], [], [], [], [], [], [], []],
        sideboardCreatures: [[], [], [], [], [], [], [], []],
        sideboardNonCreatures: [[], [], [], [], [], [], [], []],
    });

    const [draftLoaded, setDraftLoaded] = useState(false);
    const [boosterLoading, setBoosterLoading] = useState(false);
    const [playersInSeatOrder, setPlayersInSeatOrder] = useState([]);
    const [draftStatus, setDraftStatus] = useState(null);
    const [boosterCards, setBoosterCards] = useState(null);
    const [packNumber, setPackNumber] = useState(null);
    const [pickNumber, setPickNumber] = useState(null);

    const [basics, setBasics] = useState({
        plains: 0,
        islands: 0,
        swamps: 0,
        mountains: 0,
        forests: 0,
    });

    const [picksLoaded, setPicksLoaded] = useState(false);
    const [basicsLoaded, setBasicsLoaded] = useState(false);

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
                {!draftLoaded ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className={`player-list`}>
                            <PlayerList
                                players={playersInSeatOrder}
                                loggedInUser={loggedInUser}
                                chevronDirection={
                                    draftStatus === DRAFT_STATUSES.IN_PROGRESS &&
                                    (packNumber === 2 ? CHEVRON_DIRECTION.RIGHT : CHEVRON_DIRECTION.LEFT)
                                }
                            />
                        </div>
                        <MainView />
                    </>
                )}
            </main>
        </>
    );

    function MainView() {
        return (
            <>
                {draftStatus === DRAFT_STATUSES.READY_TO_START && (
                    <ReadyToStartView
                        draftId={draftId}
                        numberOfBots={Math.max(0, DEFAULT_PLAYERS_IN_DRAFT - playersInSeatOrder.length)}
                        startDraftCallback={() => getDraft()}
                    />
                )}
                {draftStatus === DRAFT_STATUSES.IN_PROGRESS &&
                    (boosterLoading ? <LoadingSpinner /> : boosterCards ? <BoosterView /> : <RefreshButtonView />)}
                {draftStatus !== DRAFT_STATUSES.READY_TO_START && (
                    <PicksView
                        showDeckbuilderPanels={draftStatus === DRAFT_STATUSES.COMPLETE}
                        {...{
                            draftId,
                            picksLoaded,
                            setPicksLoaded,
                            picks,
                            setPicks,
                            copyPicksToClipboard,
                        }}
                        basicsControlPanel={
                            <BasicsControlPanel
                                {...{
                                    draftId,
                                    basicsLoaded,
                                    setBasicsLoaded,
                                    basics,
                                    setBasics,
                                }}
                            />
                        }
                        totalBasics={basics.plains + basics.islands + basics.swamps + basics.mountains + basics.forests}
                    />
                )}
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
                <Button onClick={submitPick} className="submit-pick" disabled={selectedCardIndex === null}>
                    Submit Pick
                </Button>
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

    function getDraft() {
        asyncTry(
            async () => {
                const responseDraft = await DraftsApi.getDraft(draftId);
                setPlayersInSeatOrder(responseDraft.players.sort((a, b) => a.seatNumber - b.seatNumber));
                setDraftStatus(responseDraft.status);
                setPackNumber(responseDraft.packNumber);
                setDraftLoaded(true);

                switch (responseDraft.status) {
                    case DRAFT_STATUSES.READY_TO_START:
                        break;

                    case DRAFT_STATUSES.IN_PROGRESS:
                        getBooster();
                        break;

                    case DRAFT_STATUSES.COMPLETE:
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

    function submitPick() {
        setBoosterLoading(true);
        asyncTry(
            async () => {
                const submittedCard = boosterCards[selectedCardIndex];
                await DraftsApi.submitPick(draftId, pickNumber, submittedCard.id);
                setSelectedCardIndex(null);
                const column = submittedCard.manaValue === 0 ? 7 : Math.min(6, submittedCard.manaValue - 1);
                if (submittedCard.type.includes("Creature")) {
                    picks.deckCreatures[column].push(submittedCard);
                    setPicks({ ...picks });
                } else {
                    picks.deckNonCreatures[column].push(submittedCard);
                    setPicks({ ...picks });
                }
                getDraft();
            },
            () => {
                setBoosterLoading(false);
            }
        );
    }

    function copyPicksToClipboard() {
        const deck = [...flatten(picks.deckCreatures), ...flatten(picks.deckNonCreatures)].map(
            (card) => `1 ${card.name}`
        );
        if (basics.plains) {
            deck.push(`${basics.plains} Plains`);
        }
        if (basics.islands) {
            deck.push(`${basics.islands} Island`);
        }
        if (basics.swamps) {
            deck.push(`${basics.swamps} Swamp`);
        }
        if (basics.mountains) {
            deck.push(`${basics.mountains} Mountain`);
        }
        if (basics.forests) {
            deck.push(`${basics.forests} Forest`);
        }
        const sideboard = [...flatten(picks.sideboardCreatures), ...flatten(picks.sideboardNonCreatures)].map(
            (card) => `1 ${card.name}`
        );
        sideboard.push("10 Plains", "10 Island", "10 Swamp", "10 Mountain", "10 Forest");

        copy(deck.join("\n") + "\n\n" + sideboard.join("\n"));
    }
}
