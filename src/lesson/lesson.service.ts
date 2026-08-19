import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository, In  } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './create-lesson.input';
import { Student } from '../student/student.entity';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id } });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    // 💥 CORREÇÃO: Não busque mais as entidades no banco. 
    // Repasse diretamente o array de IDs (strings) que vem do 'createLessonInput'.
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: students || [], // Aqui agora vai string[], exatamente o que a entidade pede!
    });

    // Salva e retorna o objeto único do tipo Lesson
    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLessons(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { studentIds, lessonId } = assignStudentsToLessonInput;
    
    // 1. Busca a aula atual
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // 2. Recupera os estudantes atuais da aula (garante que seja um array)
    const currentStudents = lesson.students || [];
    
    // 3. Junta os antigos com os novos e remove duplicados usando o Set
    const updatedStudents = Array.from(new Set([...currentStudents, ...studentIds]));

    // 4. Atribui a nova lista de strings/IDs à aula
    lesson.students = updatedStudents;

    // 5. Salva no MongoDB e RETORNA a aula modificada
    return this.lessonRepository.save(lesson);
  }
}
