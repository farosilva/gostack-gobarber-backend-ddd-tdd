import { Router } from 'express';

import AuthenticatedUserService from '../services/AuthenticatedUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticatedUser = new AuthenticatedUserService();

  const { user, token } = await authenticatedUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
