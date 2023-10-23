## Descrição

Este é o backend da aplicação Contact List - O objetivo dessa aplicação é criar um lista de contatos.

## Endpoins

A API tem um total de 3 endpoints, podendo cadastrar seu cliente, realizar login e cadastrar seus contatos.<br><br>

<a href="https://insomnia.rest/run/?label=Contact%20List&uri=https%3A%2F%2Fgithub.com%2FJulia-Teixeira%2Fdesafio-fullstack-contacts-list%2Fblob%2Fdevelop%2Finsomnia_contactList.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

<blockquote> Para importar o JSON no Insomnia é só clicar no botão "Run in Insomnia". Depois é só seguir os passos que ele irá importar todos os endpoints em seu insomnia.
</blockquote>
<br>

## Instalação<hr/>

Para utilização desta API você precisa seguir os seguintes passos:

- Clone este repositório em sua máquina;
- Acesse o repositório clonado através de um terminal, pode ser o terminal integrado do vsCode ou o terminal do seu computador;
- Crie um DATABASE no PostgreSQL;
  ```bash
  $ CREATE DATABASE contact_list;
  ```
- Digite o seguinte comando no terminal npm, pnpm ou yarn install, isso fará com que todas as dependências do projeto sejam instaladas;
  ```bash
  $ pnpm install
  ```
- Preencha corretamente as variáveis de ambient;
- Digite o comando npm, pnpm ou yarn prisma migrate dev, isso criará as tabelas que são necessárias;
- Digite o comando npm, pnpm ou yarn run start:dev, isso colocará a API em funcionamento no seguinte endereço: http://localhost:8080;

  ```bash
  # development
  $ pnpm run start

  # watch mode
  $ pnpm run start:dev

  # production mode
  $ pnpm run start:prod
  ```

- Utilize a API normalmente

<br>

# Documentação

Também pode ser encontrado no link: http://localhost:8080/api

## Rotas que não precisão de autenticação

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "usuario@gmail.com",
  "password": "1234"
}
```

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNjg0OTc3NDE0LCJleHAiOjE2ODQ5ODEwMTQsInN1YiI6ImEwYWEzMDBlLTBiNDEtNDM5NS1hY2M4LTkxY2Q5YjMyODIyMiJ9.Pk2EVvTirr6IFfPLgDdS4OoD440GnCbS3hKvBQ1Eew8"
}
```

Se alguma informação estiver incorreta:<br>
`POST /login - FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "statusCode": 401,
  "message": "Email ou senha incorretos!",
  "error": "Unauthorized"
}
```

`POST /client - FORMATO DA REQUISIÇÃO`

```json
{
  "full_name": "Usuario 123",
  "email": "usuario@gmail.com",
  "phone": "(21) 9 9956-5175",
  "password": "1234"
}
```

`POST /client - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "2448f50c-9a92-4863-a807-cd1ef4201812",
  "full_name": "Usuario 123",
  "email": "usuario@gmail.com",
  "phone": "(21) 9 9956-5775",
  "created_at": "2023-05-25T01:56:11.836Z"
}
```

Caso algum campo obrigatório não seja passado:<br>
`POST /client - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "usuario@gmail.com",
  "phone": "(21) 9 9956-5775",
  "password": "1234"
}
```

<br>

`POST /client - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "statusCode": 400,
  "message": ["O campo full_name não pode estar vazio.", "Deve ser um string"],
  "error": "Bad Request"
}
```

<br> <br>

## Rotas que precisa de autenticação

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

<blockquote>
Authorization: Bearer {token}
</blockquote>
<br>

<h2 align="center"> Client</h2>

`GET /client - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "a0aa300e-0b41-4395-acc8-91cd9b328222",
  "full_name": "Joãozinho Cabeludo",
  "email": "usuario@gmail.com",
  "phone": "(21) 9 9956-5175",
  "created_at": "2023-05-25T01:16:49.095Z",
  "contacts": [
    {
      "id": "e986b85d-6c05-4f5f-bd54-b48f180b48b7",
      "full_name": "João Vasco",
      "email": "joaovasco@gmail.com",
      "phone": "(11) 9 9789-9638",
      "created_at": "2023-05-25T02:13:32.843Z",
      "client_id": "a0aa300e-0b41-4395-acc8-91cd9b328222"
    }
  ]
}
```

`PATCH /client - FORMATO DA REQUISIÇÃO`

Campos que podem ser alterados: full_name, email, phone e password.

```json
{
  "full_name": "Joãozinho Cabeludo"
}
```

`PATCH /client - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "a0aa300e-0b41-4395-acc8-91cd9b328222",
  "full_name": "Joãozinho Cabeludo",
  "email": "usuario@gmail.com",
  "phone": "(21) 9 9956-5175",
  "created_at": "2023-05-25T01:16:49.095Z"
}
```

`DELETE /client - FORMATO DA RESPOSTA - STATUS 204 - NO CONTENT`

Antes de apagar o cliente, certifique-se que ele não possui nenhum contato cadastrado.

<br>

<h2 align="center"> Contact</h2>

Caso o id do token seja diferente do client_id do contato:<br>
`GET /contact/contact_id - FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "statusCode": 404,
  "message": "Contato não encontrado",
  "error": "Not Found"
}
```

`POST /contact - FORMATO DA REQUISIÇÃO`

```json
{
  "full_name": "João Vasco",
  "email": "joaovasco@gmail.com",
  "phone": "(11) 9 9789-9638"
}
```

`POST /contact - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "e986b85d-6c05-4f5f-bd54-b48f180b48b7",
  "full_name": "João Vasco",
  "email": "joaovasco@gmail.com",
  "phone": "(11) 9 9789-9638",
  "created_at": "2023-05-25T02:13:32.843Z",
  "client_id": "a0aa300e-0b41-4395-acc8-91cd9b328222"
}
```

Caso algum campo obrigatório não seja passado:<br>
`POST /contact - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "joaovasco@gmail.com",
  "phone": "(11) 9 9789-9638"
}
```

<br>

`POST /client - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "statusCode": 400,
  "message": ["O campo full_name não pode estar vazio.", "Deve ser um string"],
  "error": "Bad Request"
}
```

<br>

`GET /contact/ - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "e986b85d-6c05-4f5f-bd54-b48f180b48b7",
    "full_name": "João Vasco",
    "email": "joaovasco@gmail.com",
    "phone": "(11) 9 9789-9638",
    "created_at": "2023-05-25T02:13:32.843Z",
    "client_id": "a0aa300e-0b41-4395-acc8-91cd9b328222"
  }
]
```

`GET /contact/contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "e986b85d-6c05-4f5f-bd54-b48f180b48b7",
  "full_name": "João Vasco",
  "email": "joaovasco@gmail.com",
  "phone": "(11) 9 9789-9638",
  "created_at": "2023-05-25T02:13:32.843Z",
  "client_id": "a0aa300e-0b41-4395-acc8-91cd9b328222"
}
```

`PATCH /contact/contact_id - FORMATO DA REQUISIÇÃO`

Campos que podem ser alterados: full_name, email e phone.

```json
{
  "full_name": "José Silva"
}
```

`PATCH /contact/contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "e986b85d-6c05-4f5f-bd54-b48f180b48b7",
  "full_name": "José Silva",
  "email": "joaovasco@gmail.com",
  "phone": "(11) 9 9789-9638",
  "created_at": "2023-05-25T02:13:32.843Z",
  "client_id": "a0aa300e-0b41-4395-acc8-91cd9b328222"
}
```

`DELETE /contact/contact_id - FORMATO DA RESPOSTA - STATUS 204 - NO CONTENT`

Lembrando que o id do token tem que ser o mesmo do "dono" do contato.

<br>
