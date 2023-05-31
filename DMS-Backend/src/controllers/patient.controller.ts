import { Body, Controller, Post, UseInterceptors, UploadedFiles, Get, Param } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePatientDto } from 'src/dtos/createPatientDto';
import { PatientService } from 'src/services/patient.service';
import type { Multer } from 'multer';
import { Gender } from 'src/entities/gender.entity';
import { Department } from 'src/entities/department.entity';
import { MaritalStatus } from 'src/entities/maritalStatus.entity';
import { Patient } from 'src/entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('documents'))
  async createPatient(@UploadedFiles() files:Multer.File[], @Body() createPatientDto: CreatePatientDto) {
    // map uploaded files to match CreateDocumentDto
    const documents = files.map(file => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      data: file.buffer,
    }));

    // add mapped documents to the createPatientDto
    createPatientDto.documents = documents;

    return this.patientService.createPatient(createPatientDto);
  }

  @Get('genders')
  async getGenders(): Promise<Gender[]> {
    return this.patientService.getGenders();
  }

  @Get('departments')
  async getDepartments(): Promise<Department[]> {
    return this.patientService.getDepartments();
  }

  @Get('marital-statuses')
  async getMaritalStatuses(): Promise<MaritalStatus[]> {
    return this.patientService.getMaritalStatuses();
  }

  @Get('details')
  async getAllPatients(): Promise<Patient[]> {
    return this.patientService.getAllPatients();
  }
  
}

