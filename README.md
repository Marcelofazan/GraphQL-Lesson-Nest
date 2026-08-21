## GraphQL-Lesson-Nest
Exemplo de Single Endpoint GraphQL em Nest com banco de dados MongoDB.

#### 📋 O que voçê vai ver nesse Projeto
| Tecnologia | Descrição |
|-----------|-----------|
| **Apollo**  | Motor/Driver que gerencia as requisições e o esquema do GraphQL. |
| **GraphQL**  | Linguagem de consulta e ambiente de execução para APIs |


#### 🔄 Executar a aplicação
- Recuperar as dependencias do projeto node_modules .
```bash
yarn config set network-timeout 300000
yarn install
npm run build
```

- Executar o Build do Projeto
```bash
yarn run start:dev
```

- Abri o endpoint do GraphQL em **http://localhost:3000/graphql**

#### 🧪 Executar Endpoints 
Certifique-se de copiar exatamente o ID retornado na mutation de criação e colá-lo na aba de variáveis dos testes seguintes.

- 1 - Criar um Novo Estudante (createStudent)

Esta mutation cria um estudante e devolve o id gerado pelo banco para ser usado nos próximos passos.
```bash
mutation CreateStudentWithVariables($input: CreateStudentInput!) {
  createStudent(createStudentInput: $input) {
    id
    firstName
    lastName
  }
}
```

- Em Query Variables (JSON): 
```bash
{
  "input": {
    "firstName": "Marcelo",
    "lastName": "Gustavo"
  }
}
```

- 2 - Criar uma Nova Aula (createLesson)

Cria uma aula passando os dados e, opcionalmente, um array com IDs de estudantes que você copiou do passo anterior.
```bash
mutation CreateLessonWithVariables($input: CreateLessonInput!) {
  createLesson(createLessonInput: $input) {
    id
    name
    startDate
    endDate
    students {
      id
      firstName
      lastName
    }
  }
}
```

- Em Query Variables (JSON):
```bash 
{
  "input": {
    "name": "Introdução ao MongoDB",
    "startDate": "2026-08-25T19:00:00Z",
    "endDate": "2026-08-25T21:00:00Z",
    "students": [
      "ID_DO_ESTUDANTE_AQUI"
    ]
  }
}
```

- 3 - Vincular Estudantes a uma Aula (assignStudentsToLesson)

Adiciona múltiplos estudantes de uma vez só a uma aula existente usando a nova lógica corrigida no backend.
```bash
mutation AssignStudentsWithVariables($input: AssignStudentsToLessonInput!) {
  assignStudentsToLesson(assignStudentsToLessonInput: $input) {
    id
    name
    students {
      id
      firstName
      lastName
    }
  }
}
```

- Em Query Variables (JSON):
```bash
{
  "input": {
    "lessonId": "ID_DA_AULA_AQUI",
    "studentIds": [
      "ID_DO_ESTUDANTE_1",
      "ID_DO_ESTUDANTE_2"
    ]
  }
}
```

- 4 - Querys Students

Get All
```bash
query { students { id firstName lastName } }
```
Get Id
```bash
query { student(id: \"ID_DO_ALUNO\") { id firstName lastName } }
```

- 5 - Querys Lessons

Get All
```bash
query { lessons { id name } }
```

Get All 
```bash
query GetAllLessonsList { lessons { id name startDate endDate students { id firstName lastName } } }
```

Get Id
```bash
query GetLessonWithFixedId { lesson(id: \"ID_DA_LESSON_AQUI\") { id name startDate endDate students { id firstName lastName } } }
```

#### 🔍 Executar Testes Unitários
```bash
yarn run test:e2e
```
