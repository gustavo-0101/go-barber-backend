import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import IEmailProvider from './EmailProvider/models/IEmailProvider';
import EtherealMailProvider from './EmailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'EmailProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IEmailProvider>(
    'EmailProvider',
    container.resolve(EtherealMailProvider),
);
