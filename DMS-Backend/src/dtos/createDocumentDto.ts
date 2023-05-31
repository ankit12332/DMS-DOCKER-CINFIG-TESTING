export class CreateDocumentDto {
  filename: string;
  mimetype: string;
  size: number;
  data: Buffer;
  }