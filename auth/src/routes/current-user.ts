import { Request, Response, Router } from 'express';

import { currentUserHandler } from '../middlewares/current-user.handler';

const currentUserRouter = Router();

currentUserRouter.get('/api/users/current-user', currentUserHandler, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export default currentUserRouter;