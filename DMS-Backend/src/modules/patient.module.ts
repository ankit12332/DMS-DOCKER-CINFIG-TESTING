import { PatientController } from './../controllers/patient.controller';
import { PatientService } from './../services/patient.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedDetails } from 'src/entities/bedDetails.entity';
import { Department } from 'src/entities/department.entity';
import { Gender } from 'src/entities/gender.entity';
import { MaritalStatus } from 'src/entities/maritalStatus.entity';
import { Patient } from 'src/entities/patient.entity';
import { DocumentModule } from './document.module';

@Module({
    imports: [TypeOrmModule.forFeature([
        Patient,
        Gender,
        Department,
        BedDetails,
        MaritalStatus
    ]),
    DocumentModule],

    controllers: [
        PatientController, ],
    providers: [
        PatientService, ],
})
export class PatientModule {}
