import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import IUsersRepository from '../repositories/iUserRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordMailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('EmailProvider')
        private emailProvider: IEmailProvider,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        this.emailProvider.sendMail(email, 'Pedido recebido');
    }
}
export default SendForgotPasswordMailService;
