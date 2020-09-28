import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakers/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('Should not be able to create an user with email already exist', async () => {
    await createUserService.execute({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Fabricio Silva',
        email: 'fabricio.roddrigo@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
