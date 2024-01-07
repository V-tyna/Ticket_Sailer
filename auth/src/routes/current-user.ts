import { Request, Response, Router } from 'express';

import { currentUserHandler } from '../middlewares/current-user.handler';
import { requireAuth } from '../middlewares/require-auth';

const currentUserRouter = Router();

currentUserRouter.get('/api/users/current-user', currentUserHandler, requireAuth, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export default currentUserRouter;