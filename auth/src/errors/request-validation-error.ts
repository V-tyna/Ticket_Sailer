import { ValidationError } from 'express-validator';

import { CommonResponseError, CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeErrors(): CommonResponseError[] {
    return this.errors.map(e => {
      return { message: <string>e.msg, field: e.type === 'field' ? e.path : '' }
    });
  }
}
