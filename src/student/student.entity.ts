import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @ObjectIdColumn()
  _id: string; // O MongoDB usa essa propriedade internamente

  @Column()
  id: string; // Mantemos este campo para salvar o UUID gerado pelo seu service

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}