import IEmailProvider from '../models/IEmailProvider';

interface IMessage {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IEmailProvider {
    private messages: IMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to,
            body,
        });
    }
}
