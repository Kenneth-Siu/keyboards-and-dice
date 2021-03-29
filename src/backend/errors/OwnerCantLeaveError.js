export const OwnerCantLeaveErrorName = "OwnerCantLeave";

export default class OwnerCantLeaveError extends Error {
    constructor(message) {
        super(message);
        this.name = OwnerCantLeaveErrorName;
    }
}