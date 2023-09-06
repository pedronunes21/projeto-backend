
# Projeto de Software | Backend

Sistema de agendamento e visualização de atividades para Crossfit


## Documentação da API
As rotas privadas exigem que se passe um token nos Header

Quando o login é realizado, o TOKEN fica salvo nos cookies com a chave `token`, e pode ser obtido da seguinte maneira

```js
const token = Cookies.get("token");
```

E deve ser passado nos headers de cada rota privada da seguinte forma

```js
headers: {
    Authorization: `Bearer ${token}`
}
```

## Rotas públicas
### AUTENTICAÇÃO
#### Login

```http
  POST /auth
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

#### Validar token
```http
  POST /auth/token
```

## Rotas privadas

### AULAS
#### Cria uma aula (Admin)

```http
  POST /lesson
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `trainingId` | `string` | **Obrigatório**. ID do Treino |
| `weekday` | `int` | **Obrigatório**. Dia da semana em número |
| `time` | `int` | **Obrigatório**. Horário em minutos (ex: 9:00 -> 540) |
| `title` | `string` | **Obrigatório**. Título da aula |
| `max_users` | `int` | **Obrigatório**. Número máximo de pessoas que podem participar da aula |

#### Retorna uma aula

```http
  GET /lesson/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID da Aula |

#### Lista todas as aulas

```http
  GET /lesson
```

### CATEGORIA DOS TREINOS
#### Cria uma categoria (Admin)

```http
  POST /category/training
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome da categoria |

#### Retorna uma categoria

```http
  GET /category/training/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID da categoria |

#### Lista todas as categorias

```http
  GET /categoy/training
```

### TREINOS
#### Cria um treino (Admin)

```http
  POST /training
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `categoryId` | `string` | **Obrigatório**. ID da categoria do treino |
| `description` | `string` | **Obrigatório**. Descrição do treino |

#### Retorna um treino

```http
  GET /training/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do treino |

#### Lista todos os treinos

```http
  GET /training
```

### USUÁRIOS
#### Retorna um usuário

```http
  GET /user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do usuário |

#### Lista todos os usuários

```http
  GET /user
```

### CONVITE DE USUÁRIOS

#### Gera um convite (Admin)

```http
  POST /invite/user/
```

## Rotas especiais
#### Cria um usuário
Essa rota necessita de um código de convite gerado pelo administrador. O código é passado como uma query pela url e é unico, quando uma conta é criada usando um código de convite, esse código se torna inválido assim que a conta for criada.

```http
  POST /user?invite={invite_code}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `invite_code` | `string` | **Obrigatório**. Código de convite gerado pelo admin |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

## Rotas de Teste
#### Cria um admin

```http
  POST /user/admin
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |






