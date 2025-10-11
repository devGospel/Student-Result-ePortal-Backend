import { Controller, Get, Post, Body, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateResultDto } from './dtos/create-result.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Result } from './schemas/result.schema';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new result' })
  @ApiBody({ type: CreateResultDto })
  @ApiResponse({ status: 201, description: 'Result created', type: Result })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all results' })
  @ApiResponse({ status: 200, description: 'List of results', type: [Result] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.resultsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/:studentId')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get results for a specific student' })
  @ApiResponse({ status: 200, description: 'List of results for student', type: [Result] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findByStudent(@Param('studentId') studentId: string) {
    return this.resultsService.findByStudent(studentId);
  }
}