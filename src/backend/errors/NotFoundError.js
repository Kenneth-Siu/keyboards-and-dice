export const NotFoundErrorName = "NotFoundError";

export default class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = NotFoundErrorName;
    }
}