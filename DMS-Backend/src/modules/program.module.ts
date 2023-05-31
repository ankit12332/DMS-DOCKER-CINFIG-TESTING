import { ProgramController } from './../controllers/program.controller';
import { ProgramService } from './../services/program.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/entities/program.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Program])],
    controllers: [
        ProgramController, ],
    providers: [  ProgramService ],
    exports: [ProgramService],
})
export class ProgramModule {}
