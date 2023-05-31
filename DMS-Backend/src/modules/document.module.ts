
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule],
})
export class DocumentModule {}
