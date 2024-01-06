import { CommonResponseError, CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  public statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): CommonResponseError[] {
    return [{ message: 'Not Found.' }];
  }
}
