import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column('bytea')
  data: Buffer;

  @ManyToOne(() => Patient, patient => patient.documents)
  @JoinColumn({ name: "patientId" }) // This line is important!
  patient: Patient;

}