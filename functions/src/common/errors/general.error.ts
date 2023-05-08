export class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode(): number {
    switch (true) {
      case this instanceof BadRequest:
        return 400;
      case this instanceof NotFound:
        return 404;
      case this instanceof UnAuthorized:
        return 401;
      case this instanceof Forbidden:
        return 403;
      case this instanceof DBError:
        return 500;
      case this instanceof ConflictError:
        return 409;
      default:
        return 500;
    }
  }
}

export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}
export class UnAuthorized extends GeneralError {}
export class DBError extends GeneralError {}
export class Forbidden extends GeneralError {}
export class ConflictError extends GeneralError {}
