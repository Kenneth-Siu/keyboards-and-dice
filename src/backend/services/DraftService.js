import { v4 as uuidv4 } from "uuid";
import { USER_MAX_OWNED_DRAFTS, DRAFT_STATUSES, CARDS_IN_PACK } from "../../config.js";
import DraftLimitReachedError from "../errors/DraftLimitReachedError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { DraftOperations } from "../repositories/DraftOperations.js";
import * as DraftRepo from "../repositories/DraftRepo.js";
import * as PlayerRepo from "../repositories/PlayerRepo.js";
import * as BoosterRepo from "../repositories/BoosterRepo.js";
import * as CardRepo from "../repositories/CardRepo.js";
import * as PickRepo from "../repositories/PickRepo.js";
import { minBy } from "lodash";

export async function getDraftsForUser(userId) {
    const drafts = await DraftRepo.findAllForUser(userId);
    const players =
        drafts.length > 0 ? await PlayerRepo.findDisplayNamesForManyDrafts(drafts.map((draft) => draft.id)) : [];

    drafts.forEach((draft) => {
        draft.players = players
            .filter((player) => player.draftId === draft.id)
            .map((player) => ({
                seatNumber: player.seatNumber,
                userId: player.userId,
                displayName: player.displayName,
            }));
    });
    return drafts;
}

export async function getDraft(draftId, userId) {
    const player = await PlayerRepo.find(userId, draftId);
    if (!player) {
        throw new NotFoundError(`Draft not found`);
    }
    const draft = await DraftRepo.find(draftId);
    if (!draft) {
        throw new NotFoundError(`Draft not found`);
    }
    const players = await PlayerRepo.findDisplayNamesForDraft(draftId);
    draft.players = players.map((player) => ({
        seatNumber: player.seatNumber,
        userId: player.userId,
        displayName: player.displayName,
    }));
    return draft;
}

export async function getBooster(draftId, userId) {
    const player = await PlayerRepo.find(userId, draftId);
    if (!player) {
        throw new NotFoundError(`Draft not found`);
    }
    const boosters = await BoosterRepo.findAllForPlayer(player.id);
    if (boosters.length === 0) {
        return {};
    }
    const booster = minBy(boosters, (booster_1) => booster_1.pickNumber);
    const cards = await CardRepo.findAllForBooster(booster.id);
    return {
        pickNumber: booster.pickNumber,
        cards: cards.map((card) => card.cardId),
    };
}

export async function getPicks(draftId, userId) {
    const player = await PlayerRepo.find(userId, draftId);
    if (!player) {
        throw new NotFoundError(`Draft not found`);
    }
    const picks = await PickRepo.findAllForPlayer(player.id);
    return picks.map((pick) => pick.cardId);
}

export async function createDraft(userId) {
    const drafts = await DraftRepo.findAllOwnedByUser(userId);
    if (drafts.length >= USER_MAX_OWNED_DRAFTS) {
        throw new DraftLimitReachedError(`Max ${USER_MAX_OWNED_DRAFTS} drafts owned at a time`);
    }
    const draft = await DraftRepo.create(uuidv4(), userId);
    await PlayerRepo.create(userId, draft.id);
}

export async function joinDraft(draftId, userId) {
    const draft = await DraftRepo.find(draftId);
    if (!draft || draft.status !== DRAFT_STATUSES.READY_TO_START) {
        throw new NotFoundError(`Draft not found`);
    }
    const player = await PlayerRepo.find(userId, draftId);
    if (!player) {
        return await PlayerRepo.create(userId, draftId);
    }
    return;
}

export async function startDraft(draftId, userId) {
    const draft = await DraftRepo.find(draftId);
    if (!draft || draft.ownerId !== userId || draft.status !== DRAFT_STATUSES.READY_TO_START) {
        throw new NotFoundError(`Draft not found`);
    }
    return await new DraftOperations().startDraft(draftId);
}

export async function makePick(draftId, userId, pickNumber, cardId) {
    const player = await PlayerRepo.find(userId, draftId);
    if (!player) {
        throw new NotFoundError(`Card not found`);
    }
    const boosters = await BoosterRepo.findAllForPlayer(player.id);
    if (boosters.length === 0) {
        throw new NotFoundError("Card not found");
    }
    const booster = minBy(boosters, (booster_1) => booster_1.pickNumber);
    if (booster.pickNumber !== pickNumber) {
        throw new NotFoundError("Card not found");
    }
    const card = await CardRepo.findCard(booster.id, cardId);
    if (!card) {
        throw new NotFoundError("Card not found");
    }
    await new DraftOperations().makePick(draftId, player.id, booster, card);
}
