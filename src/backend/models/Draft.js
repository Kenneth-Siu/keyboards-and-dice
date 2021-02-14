export const DRAFT_STATUSES = Object.freeze({
    0: "Pending",
    1: "In Progress",
    2: "Complete",
});

export class Draft {
    constructor(id, status) {
        this.id = id;
        this.status = status;
        this.statusName = DRAFT_STATUSES[status];
    }

    static createFromDb(dbDraft) {
        return new Draft(dbDraft.id, dbDraft.status);
    }
}
