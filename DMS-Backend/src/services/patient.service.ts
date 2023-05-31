import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from 'src/dtos/createPatientDto';
import { BedDetails } from 'src/entities/bedDetails.entity';
import { Department } from 'src/entities/department.entity';
import { Gender } from 'src/entities/gender.entity';
import { MaritalStatus } from 'src/entities/maritalStatus.entity';
import { Patient } from 'src/entities/patient.entity';
import { Document } from 'src/entities/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(MaritalStatus)
    private readonly maritalStatusRepository: Repository<MaritalStatus>,
    
  ) {}

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientRepository.manager.transaction(async transactionalEntityManager => {
      const genderId = createPatientDto.genderId || null;
      const departmentId = createPatientDto.departmentId || null;
      const bedId = createPatientDto.bedId || null;
      const maritalStatusId = createPatientDto.maritalStatusId || null;

      const gender = genderId ? await transactionalEntityManager.findOne(Gender, { where: { id: genderId } }) : null;
      const department = departmentId ? await transactionalEntityManager.findOne(Department, { where: { id: departmentId } }) : null;
      const bedDetails = bedId ? await transactionalEntityManager.findOne(BedDetails, { where: { id: bedId } }) : null;
      const maritalStatus = maritalStatusId ? await transactionalEntityManager.findOne(MaritalStatus, { where: { id: maritalStatusId } }) : null;

      const savedDocuments = [];
      for (const file of createPatientDto.documents) {
        const newDocument = this.documentRepository.create({
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          data: file.data,
        });

        const savedDocument = await transactionalEntityManager.save(newDocument);
        savedDocuments.push(savedDocument);
      }

      const patient = this.patientRepository.create({
        hospitalId: createPatientDto.hospitalId,
        uhidNo: createPatientDto.uhidNo,
        episodeNo: createPatientDto.episodeNo,
        redgDate: createPatientDto.redgDate|| null,
        patientName: createPatientDto.patientName,
        gender: gender,
        phoneNo: createPatientDto.phoneNo,
        age: createPatientDto.age|| null,
        department: department,
        bed: bedDetails,
        dateOfBirth: createPatientDto.dateOfBirth|| null,
        preMature: createPatientDto.preMature|| null,
        maritalStatus: maritalStatus,
        documents: savedDocuments,
      });

      return transactionalEntityManager.save(Patient, patient);
    });
  }

  async getGenders(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  async getDepartments(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async getMaritalStatuses(): Promise<MaritalStatus[]> {
    return this.maritalStatusRepository.find();
  }
  
  async getAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find({
      // relations: ['gender', 'department', 'bed', 'maritalStatus', 'documents'],
      relations: ['gender', 'department', 'bed', 'maritalStatus'],
    });
  }
}
