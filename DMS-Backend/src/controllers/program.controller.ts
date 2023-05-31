import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwtAuthGuard';
import { ProgramService } from 'src/services/program.service';

@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramController {
    constructor(private readonly programService: ProgramService) {}

  @Post()
  async createProgram(@Body() { name, description }: { name: string; description: string }) {
    return this.programService.createProgram(name, description);
  }
}
