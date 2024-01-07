import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/mongoose/user';
import { signUpValidators } from '../utils/route-validators';

const signUpRouter = Router();

signUpRouter.post('/api/users/signup', signUpValidators, validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use.');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  });

export default signUpRouter;