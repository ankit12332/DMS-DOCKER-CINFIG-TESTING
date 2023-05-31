import { UserController } from './../controllers/user.controller';
import { UserService } from './../services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ProgramModule } from './program.module';
import { ProgramService } from 'src/services/program.service';
import { AuthService } from 'src/services/auth/authentication.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ProgramModule],
    controllers: [UserController],
    providers: [ UserService, AuthService ],
})
export class UserModule {}
