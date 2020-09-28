import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakers/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able to delete the old avatar when update a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Fabricio Silva',
      email: 'fabricio.roddrigo@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    await expect(deleteFile).toBeCalledWith('avatar.jpg');
  });

  it('should not be able to change the avatar if non exist an user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-users-exist',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
