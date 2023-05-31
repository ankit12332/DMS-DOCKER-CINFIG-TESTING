import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class MaritalStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Patient, patient => patient.maritalStatus)
  patients: Patient[];
}
