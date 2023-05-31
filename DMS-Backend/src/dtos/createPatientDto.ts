import { CreateDocumentDto } from "./createDocumentDto";

export class CreatePatientDto {
    hospitalId?: string;
    uhidNo: string;
    episodeNo: string;
    redgDate?: Date| null;
    patientName: string;
    genderId?: number| null;  // <-- Note this
    phoneNo: string;
    age?: number| null;
    departmentId?: number| null;  // <-- Note this
    bedId?: number| null;  // <-- Note this
    dateOfBirth?: Date| null;
    preMature?: boolean| null;
    maritalStatusId?: number| null;  // <-- Note this
    documents:CreateDocumentDto[];  // <-- Note this
  }
  