import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";

import draftSplash from "../../../../../data/draftSplash.jpg";

import { DRAFT_STATUSES } from "../../../../config";
import * as DraftsApi from "../../../api/DraftsApi";
import { asyncTry } from "../../../helpers/asyncTry";
import { getCard } from "../../../../shared/cardList";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { PlayerList, CHEVRON_DIRECTION } from "../../../components/playerList/PlayerList";
import DndFramework from "./DndFramework";
import BoosterView from "./BoosterView/BoosterView";
import PicksView from "./PicksView/PicksView";
import ReadyToStartView from "./ReadyToStartView/ReadyToStartView";

import "./Draft.scss";

export default function Draft({ loggedInUser }) {
    const { draftId } = useParams();

    const [draft, setDraft] = useState(null);
    const [booster, setBooster] = useState(null);
    const [picks, setPicks] = useState(null);

    const [isBoosterLoading, setIsBoosterLoading] = useState(true);

    const [dndActiveCardId, setDndActiveCardId] = useState(null);
    const [sortableBooster, setSortableBooster] = useState(null);
    const [sortablePicks, setSortablePicks] = useState({
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

    useEffect(getDraft, []);

    const playerListProps = draft && {
        players: draft.players,
        loggedInUser,
        chevronDirection:
            draft.status === DRAFT_STATUSES.IN_PROGRESS &&
            (draft.packNumber === 2 ? CHEVRON_DIRECTION.RIGHT : CHEVRON_DIRECTION.LEFT),
    };

    const dndFrameworkProps = {
        booster,
        picks,
        dndActiveCardId,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
    };

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="draft-page">
                <div className="background-image-container">
                    <img className="background-image" src={draftSplash} />
                </div>
                <div className="container">
                    <h1>Draft{draft?.status === DRAFT_STATUSES.COMPLETE && " Complete!"}</h1>
                    {!draft && <LoadingSpinner />}
                    {draft && (
                        <DndFramework {...dndFrameworkProps}>
                            <div className={`player-list`}>
                                <PlayerList {...playerListProps} />
                            </div>
                            {draft.status === DRAFT_STATUSES.READY_TO_START && (
                                <ReadyToStartView {...{ draft, getDraft }} />
                            )}
                            {draft.status === DRAFT_STATUSES.IN_PROGRESS && (
                                <BoosterView
                                    {...{ draft, getDraft, booster, isBoosterLoading, sortableBooster, submitPick }}
                                />
                            )}
                            {draft.status !== DRAFT_STATUSES.READY_TO_START && (
                                <PicksView {...{ draft, picks, setPicks, sortablePicks, setSortablePicks }} />
                            )}
                        </DndFramework>
                    )}
                </div>
            </main>
        </>
    );

    function getDraft() {
        asyncTry(
            async () => {
                const responseDraft = await DraftsApi.getDraft(draftId);
                setDraft({
                    players: responseDraft.players.sort((a, b) => a.seatNumber - b.seatNumber),
                    status: responseDraft.status,
                    packNumber: responseDraft.packNumber,
                    isOwner: responseDraft.ownerId === loggedInUser.id,
                });

                switch (responseDraft.status) {
                    case DRAFT_STATUSES.IN_PROGRESS:
                        getBooster();
                        break;

                    case DRAFT_STATUSES.READY_TO_START:
                    case DRAFT_STATUSES.COMPLETE:
                    default:
                        break;
                }
            },
            () => {}
        );
    }

    function getBooster() {
        setIsBoosterLoading(true);
        asyncTry(
            async () => {
                const response = await DraftsApi.getBooster(draftId);

                const cards = response.cards?.map((card) => ({ ...card, ...getCard(card.cardId) }));
                const pickNumber = response.pickNumber !== undefined ? response.pickNumber : booster.pickNumber;
                setBooster({ cards, pickNumber });

                if (response.cards) {
                    setSortableBooster([...response.cards.map((card) => card.id)]);
                }

                setIsBoosterLoading(false);
            },
            () => {}
        );
    }

    function submitPick(cardId) {
        setIsBoosterLoading(true);
        const submittedCard = booster.cards.find((card) => card.id === cardId);
        asyncTry(
            async () => {
                await DraftsApi.submitPick(draftId, booster.pickNumber, submittedCard.cardId);
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
            () => {}
        );
    }

    function findContainerId(id) {
        if (id in sortablePicks) {
            return id;
        }

        return Object.keys(sortablePicks).find((key) => sortablePicks[key].includes(id));
    }

    function handleDragStart(event) {
        setDndActiveCardId(event.active.id);
    }

    function handleDragOver({ active, over, draggingRect }) {
        if (!active || !over) {
            return;
        }
        const overContainerId = findContainerId(over.id);
        const activeContainerId = findContainerId(active.id);

        if (activeContainerId !== overContainerId) {
            setSortablePicks((sortablePicks) => {
                const activeContainer = sortablePicks[activeContainerId];
                const overContainer = sortablePicks[overContainerId];
                const overIndex = overContainer.indexOf(over.id);
                const activeIndex = activeContainer.indexOf(active.id);

                let newIndex;

                if (over.id in sortablePicks) {
                    newIndex = overContainer.length + 1;
                } else {
                    const isBelowLastItem =
                        over &&
                        overIndex === overContainer.length - 1 &&
                        draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

                    const modifier = isBelowLastItem ? 1 : 0;

                    newIndex = overIndex >= 0 ? overIndex + modifier : overContainer.length + 1;
                }

                return {
                    ...sortablePicks,
                    [activeContainerId]: [...sortablePicks[activeContainerId].filter((item) => item !== active.id)],
                    [overContainerId]: [
                        ...sortablePicks[overContainerId].slice(0, newIndex),
                        sortablePicks[activeContainerId][activeIndex],
                        ...sortablePicks[overContainerId].slice(newIndex, sortablePicks[overContainerId].length),
                    ],
                };
            });
        } else if (active.id !== over.id) {
            setSortablePicks((sortablePicks) => {
                const activeContainer = sortablePicks[activeContainerId];
                const oldIndex = activeContainer.indexOf(active.id);
                const newIndex = activeContainer.indexOf(over.id);

                return {
                    ...sortablePicks,
                    [activeContainerId]: arrayMove(activeContainer, oldIndex, newIndex),
                };
            });
        }
    }

    function handleDragEnd() {
        setDndActiveCardId(null);
    }
}
