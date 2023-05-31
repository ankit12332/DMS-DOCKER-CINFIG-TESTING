import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgramTaggingDto } from 'src/dtos/user_program_tagging.dto';
import { User } from 'src/entities/user.entity';
import { ProgramService } from './program.service';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { UpdateUserDto } from 'src/dtos/updateUserDto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private programService: ProgramService){}

    async createUser(createUser: CreateUserDto): Promise<User> {
      const createdBy = await this.repo.findOne({where: {id: createUser.createdBy }});
      if (!createdBy) {
        throw new Error('Invalid creator ID');
      }
  
      // set createdBy
      const newUser = this.repo.create({
        ...createUser,
        createdBy
      });
  
      await this.repo.save(newUser);
  
      return newUser;
      }

      async getAllUsers(): Promise<User[]> {
        const users = await this.repo.find({
          select: ['id', 'firstName', 'lastName', 'employeeCode', 'gender', 'dateOfBirth', 'designation']
        });
    
        return users;
      }
      

      async findUserByUsername(userName: string): Promise<User>{
        const user = await this.repo.findOne({where: {userName}})
        if(!user){
            throw new NotFoundException(`User ${userName} not found`);
        }
        return user;
      }

    async getUserById(id: number): Promise<User> {
        const employee = await this.repo.findOne({where:{id}});
        if (!employee) {
        throw new NotFoundException('User not found');
        }
        return employee;
      }   

    async updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
        const employee = await this.getUserById(id);
        if (!employee) {
            throw new NotFoundException('User not found');
        }
        Object.assign(employee, updateUser);
        return this.repo.save(employee);
      }

    async deleteUser(id: number): Promise<void>{
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
        throw new NotFoundException('User not found');
        }
      }

    async userProgramTagging(assignProgramsDto: UserProgramTaggingDto): Promise<User> {
        const { userId, programIds } = assignProgramsDto;
        const user = await this.repo.findOne({where: { id: userId }});
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const programs = await this.programService.getProgramsByIds(programIds);
        user.programs = programs;
    
        return this.repo.save(user);
      }
    
      async getUserWithPrograms(username: string): Promise<User | null> {
        return await this.repo.findOne({where: { userName: username }, relations: ['programs']
        });
      }
}