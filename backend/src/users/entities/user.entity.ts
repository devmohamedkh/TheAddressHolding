import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { hash, genSalt, compare } from 'bcryptjs';
import { Apartment } from 'src/apartment/entities/apartment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: 'user' | 'admin';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;


  @OneToMany(() => Apartment, (apartment) => apartment.createdBy)
  apartments: Apartment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
