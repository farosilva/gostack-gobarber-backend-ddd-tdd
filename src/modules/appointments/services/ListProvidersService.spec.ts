import FakeUsersRepository from '@modules/users/repositories/fakers/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@exemple.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane.doe@exemple.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jack Doe',
      email: 'jack.doe@exemple.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
