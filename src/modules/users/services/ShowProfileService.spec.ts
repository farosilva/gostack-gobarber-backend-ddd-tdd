import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakers/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    await expect(profile.name).toBe('Fabricio Silva');
    await expect(profile.email).toBe('fabricio.roddrigo@gmail.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
