// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@example.com',
            name: 'yo',
            password: '123456',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPassword.execute({ password: '123123', token });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123123');
    });
});
