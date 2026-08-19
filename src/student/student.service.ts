import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getLesson(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async getLessons(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async createStudent(createStudentInpput: CreateStudentInput) {
    const { firstName, lastName } = createStudentInpput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    if (!studentIds || studentIds.length === 0) {
      return [];
    }

    // Busca os estudantes usando a sintaxe nativa do MongoDB
    const students = await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        } as any,
      },
    });

    // Garante que cada objeto retornado possua a propriedade 'id' populada
    // Se por acaso o TypeORM trouxe o valor apenas em '_id', nós jogamos para o 'id'
    return students.map(student => {
      if (student && !student.id && (student as any)._id) {
        student.id = (student as any)._id.toString();
      }
      return student;
    });
  }
}
