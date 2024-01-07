import { CommonResponseError, CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  public statusCode = 401;

  constructor() {
    super('Not Authorized.');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  public serializeErrors(): CommonResponseError[] {
    return [{ message: 'Not Authorized.' }];
  }
}
