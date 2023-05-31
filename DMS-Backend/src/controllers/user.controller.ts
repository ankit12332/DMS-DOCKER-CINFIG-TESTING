import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { UserProgramTaggingDto } from 'src/dtos/user_program_tagging.dto';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guard/jwtAuthGuard';
import { AuthService } from 'src/services/auth/authentication.service';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private authService:AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('create-user')
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get('/getAllUsers')
  async getAllUsers(): Promise<User[]>{
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() createUser: CreateUserDto) {
    return this.userService.updateUser(id, createUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Post('users-programs-tagging')
  async userProgramTagging(@Body() userProgramTaggingDto: UserProgramTaggingDto) {
    return this.userService.userProgramTagging(userProgramTaggingDto);
  }

  @Post('signin')
  async signIn(@Body() credentials: { username: string; password: string }, @Res() res: any) {
  const { username, password } = credentials;
  await this.authService.signIn(username, password, res);
}

  @Post('logout')
    async logout(@Res() res: any) {
      await this.authService.logout(res);
      res.send('Logged out successfully');
    }

  @UseGuards(JwtAuthGuard)
  @Get('/:username/programs')
  async getUserWithPrograms(@Param('username') username: string): Promise<User> {
    return this.userService.getUserWithPrograms(username);
  }
}