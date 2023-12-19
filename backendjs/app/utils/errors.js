export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.code = 400
    }
}
  

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.code = 404
    }
}
  