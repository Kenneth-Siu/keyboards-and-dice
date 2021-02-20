import { v4 as uuidv4 } from "uuid";
import { USER_MAX_OWNED_DRAFTS } from "../config.js";
import DraftLimitReachedError from "../errors/DraftLimitReachedError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { DRAFT_STATUSES } from "../models/Draft.js";
import { StartDraftRepo } from "../repositories/StartDraftRepo.js";
import * as DraftRepo from "../repositories/DraftRepo.js";
import * as PlayerRepo from "../repositories/PlayerRepo.js";
import * as BoosterRepo from "../repositories/BoosterRepo.js";
import * as CardRepo from "../repositories/CardRepo.js";
import { minBy } from "lodash";

export function getDraftsForUser(userId) {
    return DraftRepo.findAllForUser(userId);
}

export function getDraft(draftId, userId) {
    return PlayerRepo.find(userId, draftId)
        .then((player) => {
            if (!player) {
                throw new NotFoundError(`Draft with ID ${draftId} not found`);
            }
            return DraftRepo.find(draftId);
        })
        .then((draft) => {
            if (!draft) {
                throw new NotFoundError(`Draft with ID ${draftId} not found`);
            }
            return draft;
        });
}

export function getBooster(draftId, userId) {
    return PlayerRepo.find(userId, draftId)
        .then((player) => {
            if (!player) {
                throw new NotFoundError(`Draft with ID ${draftId} not found`);
            }
            return BoosterRepo.findAllForPlayer(player.id);
        })
        .then((boosters) => {
            if (boosters.length === 0) {
                return null;
            }
            const booster = minBy(boosters, (booster) => booster.packNumber * 15 + booster.pickNumber);
            return Promise.all([booster, CardRepo.findAllForBooster(booster.id)]);
        })
        .then(([booster, cards]) => {
            return {
                packNumber: booster.packNumber,
                pickNumber: booster.pickNumber,
                cards: cards.map((card) => card.cardId),
            };
        });
}

export function createDraft(userId) {
    return DraftRepo.findAllOwnedByUser(userId)
        .then((drafts) => {
            if (drafts.length > USER_MAX_OWNED_DRAFTS) {
                throw new DraftLimitReachedError(`Max ${USER_MAX_OWNED_DRAFTS} drafts owned at a time`);
            } else {
                return;
            }
        })
        .then(() => {
            return DraftRepo.create(uuidv4(), userId);
        })
        .then((draft) => {
            return PlayerRepo.create(userId, draft.id);
        });
}

export function joinDraft(draftId, userId) {
    return DraftRepo.find(draftId)
        .then((draft) => {
            if (!draft || draft.status !== DRAFT_STATUSES.READY_TO_START) {
                throw new NotFoundError(`Draft with ID ${draftId} not found`);
            }
            return PlayerRepo.find(userId, draftId);
        })
        .then((player) => {
            if (!player) {
                return PlayerRepo.create(userId, draftId);
            }
            return;
        });
}

export function startDraft(draftId, userId) {
    return DraftRepo.find(draftId).then((draft) => {
        if (draft.ownerId !== userId || draft.status !== DRAFT_STATUSES.READY_TO_START) {
            throw new NotFoundError(`Draft with ID ${draftId} not found`);
        }
        return new StartDraftRepo().startDraft(draftId);
    });
}
