import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApartmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
