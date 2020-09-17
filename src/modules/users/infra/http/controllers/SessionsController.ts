import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatedUser = container.resolve(AuthenticatedUserService);

    const { user, token } = await authenticatedUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
