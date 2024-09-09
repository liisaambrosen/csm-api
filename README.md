
# CSM - Concurrent Streaming Manager API

Projeto elaborado para criar um CSM (Concurrent Streaming Manager) para administrar quantidade de streams simultâneos de uma plataforma fictícia, utilizando NestJS, Typescript, Mongoose/MongoDB, e Jest.

## Para rodar o projeto

Clone o projeto e vá para a pasta onde está localizado.

Instalar as dependências:

```bash
  npm install
```

Rodar o projeto

```bash
  npm run start
```

* Importante: é necessário estar rodando o mongoDB localmente para executar o projeto. Verifique a porta onde está rodando e crie um arquivo .env na raiz do projeto com as seguintes propriedades:

```bash
  URL=url onde está rodando o mongoDB
  PORT=porta onde está rodando o mongoDB
```
* Por exemplo: 
```bash
  URL=localhost
  PORT=5000
```

## Rotas

#### Registrar um novo usuário

```http
  POST /user
```
É necessário enviar um JSON no body com as seguintes informações:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Obrigatório**. Seu nome de usuário único |
| `streams_limit` | `int` | **Obrigatório**. Limite de streams para esse usuário |

#### Iniciar uma nova stream

```http
  POST /streams
```
É necessário enviar um JSON no body com o parâmetro:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Obrigatório**. Id do usuário que inicia a stream |

#### Encerrar uma stream ativa

```http
  POST /streams/:id/end
```
É necessário enviar o id da stream a ser encerrada na rota.

