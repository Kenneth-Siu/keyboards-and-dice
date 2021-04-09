import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../../../config";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner.js";
import { getCard } from "../../../../shared/cardList";
import * as DraftsApi from "../../../api/DraftsApi.js";
import "./Draft.scss";
import { asyncTry } from "../../../helpers/asyncTry";
import { CHEVRON_DIRECTION, PlayerList } from "../../../components/playerList/PlayerList";
import { ReadyToStartView } from "./ReadyToStartView";
import { SortablePicks } from "./SortablePicks";
import { BasicsControlPanel } from "./BasicsControlPanel";
import { flatten } from "lodash";
import copy from "copy-to-clipboard";
import draftSplash from "../../../../../data/draftSplash.jpg";
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import CardImage from "../../../components/cardImages/MagicCardImage";
import { InProgressView } from "./InProgressView";

export default function SingleDraft({ loggedInUser }) {
    const { draftId } = useParams();

    const [draftLoaded, setDraftLoaded] = useState(false);
    const [boosterLoading, setBoosterLoading] = useState(false);
    const [playersInSeatOrder, setPlayersInSeatOrder] = useState([]);
    const [draftStatus, setDraftStatus] = useState(null);
    const [boosterCards, setBoosterCards] = useState(null);
    const [packNumber, setPackNumber] = useState(null);
    const [pickNumber, setPickNumber] = useState(null);
    const [isDraftOwner, setIsDraftOwner] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

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

    const [activeId, setActiveId] = useState(null);

    const [picks, setPicks] = useState([]);
    const [picksPiles, setPicksPiles] = useState({
        deckRow0Cmc0: [],
        deckRow0Cmc1: [],
        deckRow0Cmc2: [],
        deckRow0Cmc3: [],
        deckRow0Cmc4: [],
        deckRow0Cmc5: [],
        deckRow0Cmc6: [],
        deckRow0Cmc7: [],
        deckRow1Cmc0: [],
        deckRow1Cmc1: [],
        deckRow1Cmc2: [],
        deckRow1Cmc3: [],
        deckRow1Cmc4: [],
        deckRow1Cmc5: [],
        deckRow1Cmc6: [],
        deckRow1Cmc7: [],
        sideboardRow0Cmc0: [],
        sideboardRow0Cmc1: [],
        sideboardRow0Cmc2: [],
        sideboardRow0Cmc3: [],
        sideboardRow0Cmc4: [],
        sideboardRow0Cmc5: [],
        sideboardRow0Cmc6: [],
        sideboardRow0Cmc7: [],
        sideboardRow1Cmc0: [],
        sideboardRow1Cmc1: [],
        sideboardRow1Cmc2: [],
        sideboardRow1Cmc3: [],
        sideboardRow1Cmc4: [],
        sideboardRow1Cmc5: [],
        sideboardRow1Cmc6: [],
        sideboardRow1Cmc7: [],
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const dndContextProps = {
        sensors,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
        modifiers: [restrictToWindowEdges],
    };

    const playerListProps = draftLoaded && {
        players: playersInSeatOrder,
        loggedInUser,
        chevronDirection:
            draftStatus === DRAFT_STATUSES.IN_PROGRESS &&
            (packNumber === 2 ? CHEVRON_DIRECTION.RIGHT : CHEVRON_DIRECTION.LEFT),
    };

    const readyToStartViewProps = draftStatus === DRAFT_STATUSES.READY_TO_START && {
        draftId,
        numberOfBots: Math.max(0, DEFAULT_PLAYERS_IN_DRAFT - playersInSeatOrder.length),
        getDraft,
        startDraftCallback: getDraft,
        isOwner: isDraftOwner,
    };

    const inProgressViewProps = draftStatus === DRAFT_STATUSES.IN_PROGRESS && {
        packNumber,
        pickNumber,
        selectedCardIndex,
        setSelectedCardIndex,
        submitPick,
        boosterLoading,
        boosterCards,
        getDraft,
    };

    const sortablePicksProps = draftStatus !== DRAFT_STATUSES.READY_TO_START && {
        draftId,
        picksLoaded,
        picks,
        setPicks,
        setPicksLoaded,
        picksPiles,
        setPicksPiles,
        showDeckbuilderPanels: draftStatus === DRAFT_STATUSES.COMPLETE,
        totalBasics: basics.plains + basics.islands + basics.swamps + basics.mountains + basics.forests,
        basicsControlPanel: (
            <BasicsControlPanel
                {...{
                    draftId,
                    basicsLoaded,
                    setBasicsLoaded,
                    basics,
                    setBasics,
                }}
            />
        ),
        copyPicksToClipboard
    };

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="single-draft-page">
                <div className="background-image-container">
                    <img className="background-image" src={draftSplash} />
                </div>
                <div className="container">
                    <h1>Draft{draftStatus === DRAFT_STATUSES.COMPLETE ? " Complete!" : ""}</h1>
                    {!draftLoaded && <LoadingSpinner />}
                    {draftLoaded && (
                        <DndContext {...dndContextProps}>
                            <div className={`player-list`}>
                                <PlayerList {...playerListProps} />
                            </div>
                            {draftStatus === DRAFT_STATUSES.READY_TO_START && (
                                <ReadyToStartView {...readyToStartViewProps} />
                            )}
                            {draftStatus === DRAFT_STATUSES.IN_PROGRESS && <InProgressView {...inProgressViewProps} />}
                            {draftStatus !== DRAFT_STATUSES.READY_TO_START && <SortablePicks {...sortablePicksProps} />}
                            <DragOverlay>
                                {activeId && (
                                    <CardImage
                                        className="sortable"
                                        src={picks.find((pick) => pick.id === activeId).imageName}
                                    />
                                )}
                            </DragOverlay>
                        </DndContext>
                    )}
                </div>
            </main>
        </>
    );

    function findContainer(id) {
        if (id in picksPiles) {
            return id;
        }

        return Object.keys(picksPiles).find((key) => picksPiles[key].includes(id));
    }

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragOver({ active, over, draggingRect }) {
        if (!active || !over) {
            return;
        }
        const overContainer = findContainer(over.id);
        const activeContainer = findContainer(active.id);

        if (activeContainer !== overContainer) {
            setPicksPiles((picksPiles) => {
                const activePile = picksPiles[activeContainer];
                const overPile = picksPiles[overContainer];
                const overIndex = overPile.indexOf(over.id);
                const activeIndex = activePile.indexOf(active.id);

                let newIndex;

                if (over.id in picksPiles) {
                    newIndex = overPile.length + 1;
                } else {
                    const isBelowLastItem =
                        over &&
                        overIndex === overPile.length - 1 &&
                        draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

                    const modifier = isBelowLastItem ? 1 : 0;

                    newIndex = overIndex >= 0 ? overIndex + modifier : overPile.length + 1;
                }

                return {
                    ...picksPiles,
                    [activeContainer]: [...picksPiles[activeContainer].filter((item) => item !== active.id)],
                    [overContainer]: [
                        ...picksPiles[overContainer].slice(0, newIndex),
                        picksPiles[activeContainer][activeIndex],
                        ...picksPiles[overContainer].slice(newIndex, picksPiles[overContainer].length),
                    ],
                };
            });
        } else if (active.id !== over.id) {
            setPicksPiles((picksPiles) => {
                const activePile = picksPiles[activeContainer];
                const oldIndex = activePile.indexOf(active.id);
                const newIndex = activePile.indexOf(over.id);

                return {
                    ...picksPiles,
                    [activeContainer]: arrayMove(activePile, oldIndex, newIndex),
                };
            });
        }
    }

    function handleDragEnd() {
        setActiveId(null);
    }

    function getDraft() {
        asyncTry(
            async () => {
                const responseDraft = await DraftsApi.getDraft(draftId);
                setPlayersInSeatOrder(responseDraft.players.sort((a, b) => a.seatNumber - b.seatNumber));
                setDraftStatus(responseDraft.status);
                setPackNumber(responseDraft.packNumber);
                setIsDraftOwner(responseDraft.ownerId === loggedInUser.id);
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
                    setBoosterCards(response.cards.map((card) => getCard(card.cardId)));
                } else {
                    setBoosterCards(null);
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
        const submittedCard = boosterCards[selectedCardIndex];
        setSelectedCardIndex(null);
        asyncTry(
            async () => {
                await DraftsApi.submitPick(draftId, pickNumber, submittedCard.cardId);
                // const column = submittedCard.manaValue === 0 ? 7 : Math.min(6, submittedCard.manaValue - 1);
                // if (submittedCard.type.includes("Creature")) {
                //     picks.deckCreatures[column].push(submittedCard);
                //     setPicks({ ...picks });
                // } else {
                //     picks.deckNonCreatures[column].push(submittedCard);
                //     setPicks({ ...picks });
                // }
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
