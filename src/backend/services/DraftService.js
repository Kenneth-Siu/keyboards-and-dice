import { v4 as uuidv4 } from "uuid";
import { USER_MAX_DRAFTS } from "../config.js";
import DraftLimitReachedError from "../errors/DraftLimitReachedError.js";
import NotFoundError from "../errors/NotFoundError.js";
import * as DraftRepo from "../repositories/DraftRepo.js";
import * as PlayerRepo from "../repositories/PlayerRepo.js";

export function getDraftsForUser(userId) {
    return DraftRepo.findAllForUser(userId);
}

export function createDraft(userId) {
    return PlayerRepo.findAllForUser(userId)
        .then((players) => {
            if (players.length > USER_MAX_DRAFTS) {
                throw DraftLimitReachedError(`Max ${USER_MAX_DRAFTS} drafts at a time`);
            } else {
                return;
            }
        })
        .then(() => {
            return DraftRepo.create(uuidv4());
        })
        .then((draft) => {
            return PlayerRepo.create(userId, draft.id);
        });
}

export function joinDraft(draftId, userId) {
    return PlayerRepo.findAllForUser(userId)
        .then((players) => {
            if (players.length > USER_MAX_DRAFTS) {
                throw DraftLimitReachedError(`Max ${USER_MAX_DRAFTS} drafts at a time`);
            } else {
                return;
            }
        })
        .then(() => {
            return DraftRepo.find(draftId);
        })
        .then((draft) => {
            if (!draft) {
                throw NotFoundError(`Draft with ID ${draftId} not found`);
            }
            return;
        })
        .then(() => {
            return PlayerRepo.find(userId, draftId).then((player) => {
                if (!player) {
                    return PlayerRepo.create(userId, draftId);
                }
                return;
            });
        });
}
