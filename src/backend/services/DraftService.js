import { v4 as uuidv4 } from "uuid";
import { USER_MAX_OWNED_DRAFTS } from "../config.js";
import DraftLimitReachedError from "../errors/DraftLimitReachedError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { DRAFT_STATUSES } from "../models/Draft.js";
import { startDraft as repoStartDraft } from "../repositories/startDraft.js";
import * as DraftRepo from "../repositories/DraftRepo.js";
import * as PlayerRepo from "../repositories/PlayerRepo.js";

export function getDraftsForUser(userId) {
    return DraftRepo.findAllForUser(userId);
}

export function getDraft(draftId, userId) {
    return PlayerRepo.find(userId, draftId)
        .then((player) => {
            if (!player) {
                throw NotFoundError(`Draft with ID ${draftId} not found`);
            }
            return DraftRepo.find(draftId);
        })
        .then((draft) => {
            if (!draft) {
                throw NotFoundError(`Draft with ID ${draftId} not found`);
            }
            return draft;
        });
}

export function createDraft(userId) {
    return DraftRepo.findAllOwnedByUser(userId)
        .then((drafts) => {
            if (drafts.length > USER_MAX_OWNED_DRAFTS) {
                throw DraftLimitReachedError(`Max ${USER_MAX_OWNED_DRAFTS} drafts owned at a time`);
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
                throw NotFoundError(`Draft with ID ${draftId} not found`);
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
    return DraftRepo.isOwnedByUser(draftId, userId).then((isOwned) => {
        if (!isOwned) {
            throw NotFoundError(`Draft with ID ${draftId} not found`);
        }
        return repoStartDraft(draftId);
    });
}
