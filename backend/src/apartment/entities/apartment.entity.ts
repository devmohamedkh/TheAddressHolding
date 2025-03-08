import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ApartmentType } from 'src/apartment-type/entities/apartment-type.entity';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.apartments, { nullable: false, onDelete: 'CASCADE' })
  createdBy: User;

  @Column()
  imageUrl: string;

  @ManyToOne(() => ApartmentType, { nullable: false })
  type: ApartmentType;

  @Column()
  title: string;

  @Column()
  phone: string;

  @Column()
  location: string;

  @Column('text')
  description: string;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column({ default: true })
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
