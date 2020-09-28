import FakeUsersRepository from '@modules/users/repositories/fakers/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticatedUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticatedUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non exist user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'fabricio.roddrig@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'fabricio.roddrigo@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
