import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Program } from './program.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  employeeCode: string;

  @Column()
  gender: string;

  @Column({ type: 'date' }) // format YYYY-MM-DD
  dateOfBirth: Date;

  @Column()
  designation: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToMany(() => Program, (program) => program.users, { cascade: true })
  @JoinTable({ name: 'user_programs_tagging' }) // Specify the name of the join table
  programs: Program[];
}