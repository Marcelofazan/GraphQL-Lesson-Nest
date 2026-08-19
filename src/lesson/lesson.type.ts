import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from '../student/student.type'; // Ajuste o import se necessário

@ObjectType('Lesson')
export class LessonType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  // Garanta que o tipo de retorno aqui aponta para a classe de Tipo do GraphQL e não para a Entidade do banco
  @Field(() => [StudentType])
  students: string[];
}