import { DocumentModule } from './modules/document.module';
import { PatientModule } from './modules/patient.module';
import { ProgramModule } from './modules/program.module';
import { UserModule } from './modules/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UserModule, 
    ProgramModule, 
    DocumentModule, 
    PatientModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
