export class EmailAlreadyUsedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AlreadyUsedError";
    }
}