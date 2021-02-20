export const DRAFT_STATUSES = Object.freeze({
    0: "Ready to Start",
    READY_TO_START: 0,
    1: "In Progress",
    IN_PROGRESS: 1,
    2: "Complete",
    COMPLETE: 2
});

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
