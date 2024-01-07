import { Request, Response, Router } from 'express';

const signOutRouter = Router();

signOutRouter.post('/api/users/signout', (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export default signOutRouter;