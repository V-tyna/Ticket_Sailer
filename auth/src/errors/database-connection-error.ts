import { CommonResponseError, CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  public reason = 'Error connecting to database';
  public statusCode = 500;

  constructor() {
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): CommonResponseError[] {
    return [{ message: this.reason }];
  }
}
