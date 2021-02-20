import { DRAFT_STATUSES } from "../../config.js";

export class Draft {
    constructor(id, ownerId, status) {
        this.id = id;
        this.ownerId = ownerId;
        this.status = status;
        this.statusName = DRAFT_STATUSES[status];
    }

    static createFromDb(dbDraft) {
        return new Draft(dbDraft.id, dbDraft.ownerid, dbDraft.status);
    }
}
