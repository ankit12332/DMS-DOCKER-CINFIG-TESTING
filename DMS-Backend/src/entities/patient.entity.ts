import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Gender } from './gender.entity';
import { Department } from './department.entity';
import { BedDetails } from './bedDetails.entity';
import { MaritalStatus } from './maritalStatus.entity';
import { Document } from './document.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  hospitalId: string;

  @Column()
  uhidNo: string;

  @Column()
  episodeNo: string;

  @Column({ unique: true })
  episodeId: string;  // this will be the concatenation of uhidNo and episodeNo

  @Column({ nullable: true })
  redgDate: Date;

  @Column()
  patientName: string;

  @ManyToOne(() => Gender, gender => gender.patients)
  gender: Gender;

  @Column({ nullable: true })
  phoneNo: string;

  @Column({ nullable: true })
  age: number;

  @ManyToOne(() => Department, department => department.patients)
  department: Department;

  @ManyToOne(() => BedDetails, bed => bed.patients)
  bed: BedDetails;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  preMature: boolean;

  @ManyToOne(() => MaritalStatus, maritalStatus => maritalStatus.patients)
  maritalStatus: MaritalStatus;

  @OneToMany(() => Document, document => document.patient)
  documents: Document[];

  @BeforeInsert()
  @BeforeUpdate()
  generateEpisodeId(): void {
    this.episodeId = `${this.uhidNo}${this.episodeNo}`;
  }
}
