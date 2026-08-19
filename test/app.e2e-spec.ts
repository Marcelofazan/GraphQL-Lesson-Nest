import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve buscar a lista de estudantes com sucesso via GraphQL', () => {
    const query = {
      query: 'query { students { id firstName lastName } }'
    };

    return request(app.getHttpServer())
      .post('/graphql') // Endpoint correto do GraphQL
      .send(query)
      .expect(200)
      .expect((res) => {
        // Valida se a resposta envelopada do GraphQL possui a estrutura esperada
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('students');
        expect(Array.isArray(res.body.data.students)).toBe(true);
      });
  });
});