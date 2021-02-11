// import AppError from '@shared/errors/AppError';

import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import SendForgotPasswordMailService from './SendForgotPasswordMailService';

describe('CreateUser', () => {
    it('should be able to send an email to recover the password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeEmailProvider = new FakeEmailProvider();

        const sendEmail = jest.spyOn(fakeEmailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordMailService(
            fakeUsersRepository,
            fakeEmailProvider,
        );

        await fakeUsersRepository.create({
            email: 'johndoe@example.com',
            name: 'yo',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(sendEmail).toHaveBeenCalled();
    });
});
