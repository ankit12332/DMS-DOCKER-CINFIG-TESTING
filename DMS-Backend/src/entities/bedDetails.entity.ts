import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class BedDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Patient, patient => patient.bed)
  patients: Patient[];
}

