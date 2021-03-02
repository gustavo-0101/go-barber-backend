import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/iHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/iUserRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Este token não existe');
        }
        {
            const user = await this.usersRepository.findById(userToken.user_id);

            if (!user) {
                throw new AppError('O usuário não existe');
            }

            const tokenCreatedAt = userToken.created_at;
            const compareDate = addHours(tokenCreatedAt, 2);

            if (isAfter(Date.now(), compareDate)) {
                throw new AppError('O seu token expirou');
            }

            user.password = await this.hashProvider.generateHash(password);

            await this.usersRepository.save(user);
        }
    }
}
export default ResetPasswordService;
