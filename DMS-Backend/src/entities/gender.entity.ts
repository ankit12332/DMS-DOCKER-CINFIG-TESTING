import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Patient, patient => patient.gender)
  patients: Patient[];
}
