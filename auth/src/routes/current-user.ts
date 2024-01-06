import { Router } from 'express';

const currentUserRouter = Router();

currentUserRouter.get('/api/users/current-user', (req, res) => {
  res.send('Hi there!');
});

export default currentUserRouter;