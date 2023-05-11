import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { DatabaseConnectionError } from '../models/errors/database-connection-error';
import { RequestValidationError } from '../models/errors/request-validation-error';
import { signUpValidators } from '../utils/route-validators';

const signUpRouter = Router();

signUpRouter.post('/api/users/signup', signUpValidators,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log('User created..');
    throw new DatabaseConnectionError();
    // res.send({});

    // new User({ email, password });
  });

export default signUpRouter;