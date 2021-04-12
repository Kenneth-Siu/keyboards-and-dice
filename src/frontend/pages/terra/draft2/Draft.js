import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";

import draftSplash from "../../../../../data/draftSplash.jpg";

import { DRAFT_STATUSES } from "../../../../config";
import * as DraftsApi from "../../../api/DraftsApi";
import { asyncTry } from "../../../helpers/asyncTry";
import * as CookieHelper from "../../../helpers/CookieHelper";
import { getCard } from "../../../../shared/cardList";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { PlayerList, CHEVRON_DIRECTION } from "../../../components/playerList/PlayerList";
import DndFramework from "./DndFramework";
import { getDraftCookieName, getDefaultRowColumnForCard, boosterContainerId } from "./DraftHelpers";
import BoosterView from "./BoosterView/BoosterView";
import PicksView from "./PicksView/PicksView";
import ReadyToStartView from "./ReadyToStartView/ReadyToStartView";

import "./Draft.scss";

export default function Draft({ loggedInUser }) {
    const { draftId } = useParams();

    const [draft, setDraft] = useState(null);
    const [booster, setBooster] = useState({ cards: [], sortableCards: [], isLoading: true });
    const [picks, setPicks] = useState(null);

    const [dndActiveCardId, setDndActiveCardId] = useState(null);
    const [sortablePicks, setSortablePicks] = useState({
        deckRow0Column0: [],
        deckRow0Column1: [],
        deckRow0Column2: [],
        deckRow0Column3: [],
        deckRow0Column4: [],
        deckRow0Column5: [],
        deckRow0Column6: [],
        deckRow1Column0: [],
        deckRow1Column1: [],
        deckRow1Column2: [],
        deckRow1Column3: [],
        deckRow1Column4: [],
        deckRow1Column5: [],
        deckRow1Column6: [],
        sideboardRow0Column0: [],
        sideboardRow0Column1: [],
        sideboardRow0Column2: [],
        sideboardRow0Column3: [],
        sideboardRow0Column4: [],
        sideboardRow0Column5: [],
        sideboardRow0Column6: [],
        sideboardRow1Column0: [],
        sideboardRow1Column1: [],
        sideboardRow1Column2: [],
        sideboardRow1Column3: [],
        sideboardRow1Column4: [],
        sideboardRow1Column5: [],
        sideboardRow1Column6: [],
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
                                <BoosterView {...{ draft, getDraft, booster, handlePickSubmission }} />
                            )}
                            {draft.status !== DRAFT_STATUSES.READY_TO_START && (
                                <PicksView {...{ draft, booster, picks, setPicks, sortablePicks, setSortablePicks }} />
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
        setBooster((booster) => ({ ...booster, isLoading: true }));
        asyncTry(
            async () => {
                const response = await DraftsApi.getBooster(draftId);
                const cards = response.cards?.map((card) => ({ ...card, ...getCard(card.cardId) }));
                const sortableCards = response.cards?.map((card) => card.id);
                const pickNumber = response.pickNumber !== undefined ? response.pickNumber : booster?.pickNumber;
                setBooster({ cards, sortableCards, pickNumber, isLoading: false });
            },
            () => {}
        );
    }

    function handlePickSubmission(cardId) {
        const submittedCard = booster.cards.find((card) => card.id === cardId);

        setPicks((picks) => [...picks, submittedCard]);

        const containerId = getDefaultRowColumnForCard(submittedCard);
        const newSortablePicks = {
            ...sortablePicks,
            [containerId]: [...sortablePicks[containerId], submittedCard.id],
        };
        setSortablePicks(newSortablePicks);
        
        CookieHelper.set(getDraftCookieName(draftId), newSortablePicks);
        submitPick(cardId);
    }

    function submitPick(cardId) {
        setBooster((booster) => ({ ...booster, isLoading: true }));
        asyncTry(
            async () => {
                await DraftsApi.submitPick(draftId, booster.pickNumber, cardId);
                getDraft();
            },
            () => {}
        );
    }

    function findContainerId(itemId) {
        if (itemId in sortablePicks) {
            return itemId;
        }

        return booster?.sortableCards.includes(itemId)
            ? boosterContainerId
            : Object.keys(sortablePicks).find((key) => sortablePicks[key].includes(itemId));
    }

    function findContainer(containerId) {
        if (containerId === boosterContainerId) {
            return booster.sortableCards;
        }
        return sortablePicks[containerId];
    }

    function handleDragStart(event) {
        setDndActiveCardId(event.active.id);
    }

    function handleDragOver({ active, over, draggingRect }) {
        const overId = over?.id;

        if (!overId) {
            return;
        }

        const overContainerId = findContainerId(overId);
        const activeContainerId = findContainerId(active.id);

        if (
            !overContainerId ||
            !activeContainerId ||
            (overContainerId === boosterContainerId && !booster.cards.find((card) => card.id === active.id))
        ) {
            return;
        }

        if (activeContainerId !== overContainerId) {
            const activeContainer = findContainer(activeContainerId);
            const overContainer = findContainer(overContainerId);
            const overIndex = overContainer.indexOf(overId);
            const activeIndex = activeContainer.indexOf(active.id);

            let newIndex;

            if (overId in sortablePicks) {
                newIndex = overContainer.length + 1;
            } else {
                const isBelowLastItem =
                    over &&
                    overIndex === overContainer.length - 1 &&
                    draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overContainer.length + 1;
            }

            let newSortableCards = [...booster.sortableCards];
            const newSortablePicks = { ...sortablePicks };

            if (overContainerId === boosterContainerId) {
                newSortableCards = [
                    ...overContainer.slice(0, newIndex),
                    activeContainer[activeIndex],
                    ...overContainer.slice(newIndex, overContainer.length),
                ];
            } else {
                newSortablePicks[overContainerId] = [
                    ...overContainer.slice(0, newIndex),
                    activeContainer[activeIndex],
                    ...overContainer.slice(newIndex, overContainer.length),
                ];
            }

            if (activeContainerId === boosterContainerId) {
                newSortableCards = [...activeContainer.filter((item) => item !== active.id)];
            } else {
                newSortablePicks[activeContainerId] = [...activeContainer.filter((item) => item !== active.id)];
            }

            setBooster({ ...booster, sortableCards: newSortableCards });
            setSortablePicks(newSortablePicks);
        }
    }

    function handleDragEnd({ active, over }) {
        const activeContainerId = findContainerId(active.id);

        if (!activeContainerId) {
            setDndActiveCardId(null);
            return;
        }

        const overId = over?.id;

        const overContainerId = findContainerId(overId);

        if (activeContainerId && overContainerId) {
            const activeContainer = findContainer(activeContainerId);
            const overContainer = findContainer(overContainerId);
            const activeIndex = activeContainer.indexOf(active.id);
            const overIndex = overContainer.indexOf(overId);

            if (activeContainerId === boosterContainerId && overContainerId === boosterContainerId) {
                if (activeIndex !== overIndex) {
                    const newSortableCards = arrayMove(booster.sortableCards, activeIndex, overIndex);

                    setBooster({ ...booster, sortableCards: newSortableCards });
                }
            } else if (activeContainerId !== boosterContainerId && overContainerId !== boosterContainerId) {
                if (booster.cards.find((card) => card.id === active.id)) {
                    setPicks([...picks, booster.cards.find((card) => card.id === active.id)]);
                    setBooster({ ...booster, cards: booster.cards.filter((card) => card.id !== active.id) });
                    submitPick(active.id);
                }

                const newSortablePicks = { ...sortablePicks };
                if (activeIndex !== overIndex) {
                    newSortablePicks[overContainerId] = arrayMove(
                        sortablePicks[overContainerId],
                        activeIndex,
                        overIndex
                    );
                    setSortablePicks(newSortablePicks);
                }

                CookieHelper.set(getDraftCookieName(draftId), newSortablePicks);
            } else {
                console.error("This shouldn't ever happen. Can you let me know, please?");
            }
        }

        setDndActiveCardId(null);
    }
}
