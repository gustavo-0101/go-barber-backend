# Recuperação de senha

**RF** => Requisitos funcionais (funcionalidades)

<!-- -   O usuário deve poder recuperar sua senha informando o email; -->
-   O usuário deve receber um email com instruções de recuperação de senha;
<!-- -   O usuário deve poder resetar sua senha; -->

**RNF** => Requisitos não funcionais (libs e tal)

-   Utilizar Mailtrap pra testar envios em dev;
-   Utilizar Amazon SES para envios em produção;
-   O envio de e-mail deve acontecer em segundo plano (bg job);

**RN** => Regras de negócio (autoexplicativo)

-   O link enviado por email para resetar senha deve expirar em 2h;
-   O usuário precisa confirmar a nova senha ao resetá-la;

# Atualização do perfil

**RF** => Requisitos funcionais (funcionalidades)

-   O usuário deve poder atualizar seu perfil (nome, email, senha);

**RN** => Regras de negócio (autoexplicativo)

-   O usuário não pode atualizar seu email para um email já utilizado;
-   Para atualizar sua senha o usuário deve informar a senha atual;
-   Para atualizar sua senha o usuário precisa confirmá-la;;

# Painel do prestador

**RF** => Requisitos funcionais (funcionalidades)

-   O usuário deve poder listar os seus agendamentos de um dia específico;
-   O prestador deve receber uma notificação sempre que houver um novo agendamento;
-   O prestador deve poder vizualizar as notificações não lidas;

**RNF** => Requisitos não funcionais (libs e tal)

-   Agendamentos do dia devem ser armazenados em cache;
-   As notificações devem ser armazenadas no MongoDB;
-   As notificações do prestador devem ser enviadas em tempo real com o Socket.IO;

**RN** => Regras de negócio (autoexplicativo)

-   A notificação dever ter um status de lida ou não lida;

# Agendamento de Serviço

**RF** => Requisitos funcionais (funcionalidades)

-   O usuário deve poder listar todos os prestadores de serviçoes cadastrados;
-   O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
-   O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
-   O usuário deve poder realizar um novo agendamento com um prestador;

**RNF** => Requisitos não funcionais (libs e tal)

-   A listagem de prestadores deve ser armazenada em cache;

**RN** => Regras de negócio (autoexplicativo)

-   Cada agendamento deve durar 1h exatamente;
-   Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro as 8h, último as 17h);
-   O usuário não pode agendar em um horário já ocupado;
-   O usuário não pode agendar em um horário no passado;
-   O usuário não pode marcar um horário com ele mesmo;
