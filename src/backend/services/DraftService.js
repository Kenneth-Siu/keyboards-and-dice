import { v4 as uuidv4 } from "uuid";
import NotFoundError from "../errors/NotFoundError.js";
import * as DraftRepo from "../repositories/DraftRepo.js";
import * as PlayerRepo from "../repositories/PlayerRepo.js";

export function getDraftsForUser(userId) {
    return DraftRepo.findAllForUser(userId);
}

export function createDraft(userId) {
    return DraftRepo.create(uuidv4()).then((draft) => {
        return PlayerRepo.create(userId, draft.id);
    });
}

export function joinDraft(draftId, userId) {
    return DraftRepo.find(draftId)
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
