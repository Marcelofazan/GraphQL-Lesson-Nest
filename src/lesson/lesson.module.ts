import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]), // Apenas Lesson aqui
    StudentModule, // Adicione o módulo de estudantes aqui
  ],
  providers: [LessonService, LessonResolver],
})
export class LessonModule {}
