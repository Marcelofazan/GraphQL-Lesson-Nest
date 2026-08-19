import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
  ],
  providers: [StudentService, StudentResolver],
  exports: [
    TypeOrmModule, // 💥 ISSO É CRUCIAL: Permite que o LessonModule use o StudentRepository
    StudentService, // Se o seu resolver ou outro service precisar chamar métodos do StudentService
  ],
})
export class StudentModule {}