import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequest {
    user_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        user_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        return [
            {
                day: 1,
                available: false,
            },
        ];
    }
}

export default ListProviderService;
