import { CommonResponseError, CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  public statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeErrors(): CommonResponseError[] {
    return [{ message: this.message }];
  }
}