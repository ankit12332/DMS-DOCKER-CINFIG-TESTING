import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/entities/program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramService {
    constructor(@InjectRepository(Program) private repo: Repository<Program>) {}
    
      async getProgramsByIds(programIds: number[]): Promise<Program[]> {
        return this.repo.findByIds(programIds);
      }
    
      async createProgram(name: string, description: string): Promise<Program> {
        const program = this.repo.create({ name, description });
        return this.repo.save(program);
      }
}
