import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/mongoose/user';
import { PasswordManager } from '../services/password-manager';
import { signInValidators } from '../utils/route-validators';

const signInRouter = Router();

signInRouter.post('/api/users/signin', signInValidators, validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials.');
  }

  const isPasswordsMatch = await PasswordManager.compare(existingUser.password, password);

  if (!isPasswordsMatch) {
    throw new BadRequestError('Invalid credentials. Wrong password.');
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email
    },
    process.env.JWT_SECRET!
  );

  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);
});

export default signInRouter;