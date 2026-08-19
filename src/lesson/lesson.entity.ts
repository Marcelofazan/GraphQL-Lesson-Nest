import { Entity, ObjectIdColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Lesson {
  // O MongoDB exige o identificador interno _id. Adicione esta linha:
  @ObjectIdColumn()
  _id: string; 

  // Mantenha o seu ID em formato string UUID se você o gera manualmente
  @PrimaryColumn()
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  students: string[]; // Array simples de strings (IDs)
}