import * as DraftRepo from "../repositories/DraftRepo.js";
import * as PlayerRepo from "../repositories/PlayerRepo.js";

export function getDraftsForUser(userId) {
    return DraftRepo.findAllForUser(userId);
}

export function createDraft(userId) {
    return DraftRepo.create("blah").then((draft) => {
        return PlayerRepo.create(userId, draft.id);
    });
}
