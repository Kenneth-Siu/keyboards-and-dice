import { DRAFT_STATUSES } from "../../config.js";

export class Draft {
    constructor(id, ownerId, status, createdAt) {
        this.id = id;
        this.ownerId = ownerId;
        this.status = status;
        this.createdAt = createdAt;
        this.statusName = DRAFT_STATUSES[status];
    }

    static createFromDb(dbDraft) {
        return new Draft(dbDraft.id, dbDraft.owner_id, dbDraft.status, new Date(dbDraft.created_at));
    }

    static createManyFromDb(dbDrafts) {
        return dbDrafts.map(dbDraft => Draft.createFromDb(dbDraft));
    }
}
