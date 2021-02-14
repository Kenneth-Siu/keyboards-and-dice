export const DraftLimitReachedErrorName = "DraftLimitReached";

export default class DraftLimitReachedError extends Error {
    constructor(message) {
        super(message);
        this.name = DraftLimitReachedErrorName;
    }
}