import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakers/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create an user with email already exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Fabricio Silva',
        email: 'fabricio.roddrigo@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
