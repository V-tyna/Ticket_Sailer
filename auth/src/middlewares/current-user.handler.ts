import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserPayload } from '../models/interfaces/user';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUserHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = <UserPayload>jwt.verify(req.session.jwt, process.env.JWT_SECRET!);

    req.currentUser = payload;
  } catch (err) { }

  next();
};