import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
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

            user.password = password;

            await this.usersRepository.save(user);
        }
    }
}
export default ResetPasswordService;
