import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentType } from '../student/student.type'; 
import { StudentService } from 'src/student/student.service'; // Volte com o import

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService, // Recoloque aqui
  ) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    // Garanta o 'return' e o mapeamento correto do método do service
    return this.lessonService.assignStudentsToLessons(
      assignStudentsToLessonInput,
    );
  }

  // O GraphQL vai chamar essa função automaticamente para resolver os objetos dos estudantes
  @ResolveField(() => [StudentType]) // Mude de Student para StudentType aqui no decorator
  async students(@Parent() lesson: Lesson) {
    const studentIds = lesson.students || [];
    
    if (studentIds.length === 0) {
      return [];
    }

    try {
      const studentsRaw = await this.studentService.getManyStudents(studentIds);

      // Cria instâncias explícitas da classe aceita pelo GraphQL
      const mappedStudents: StudentType[] = studentsRaw
        .filter(student => student !== null && student !== undefined)
        .map(student => {
          const resolvedId = student.id || (student as any)._id;
          
          const studentTypeInstance = new StudentType();
          studentTypeInstance.id = resolvedId ? resolvedId.toString() : 'ID_EM_BRANCO';
          studentTypeInstance.firstName = student.firstName || '';
          studentTypeInstance.lastName = student.lastName || '';
          
          return studentTypeInstance;
        });

      // Remove qualquer registro inválido antes de entregar para o motor do GraphQL
      return mappedStudents.filter(s => s.id !== 'ID_EM_BRANCO');
    } catch (error) {
      console.error('Falha crítica ao resolver estudantes:', error);
      return [];
    }
  }
}