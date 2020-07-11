import { Router } from 'express';

import AuthenticatedUserService from '../services/AuthenticatedUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticatedUser = new AuthenticatedUserService();

    const { user, token } = await authenticatedUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

export default sessionsRouter;
