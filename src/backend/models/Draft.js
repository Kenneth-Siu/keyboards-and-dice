export const DRAFT_STATUSES = Object.freeze({
    0: "Ready to Start",
    1: "In Progress",
    2: "Complete",
});

export class Draft {
    constructor(id, ownerId, status) {
        this.id = id;
        this.ownerId = ownerId;
        this.status = status;
        this.statusName = DRAFT_STATUSES[status];
    }

    static createFromDb(dbDraft) {
        return new Draft(dbDraft.id, dbDraft.ownerId, dbDraft.status);
    }
}
