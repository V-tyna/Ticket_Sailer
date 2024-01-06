import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../errors/request-validation-error';
import { signUpValidators } from '../utils/route-validators';
import { User } from '../models/mongoose/user';
import { BadRequestError } from '../errors/bad-request-error';

const signUpRouter = Router();

signUpRouter.post('/api/users/signup', signUpValidators,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use.');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, 'Temporary secret');

    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  });

export default signUpRouter;