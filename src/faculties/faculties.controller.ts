import { Controller, Get, Post, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateFacultyDto } from './dtos/create-faculty.dto';
import { Faculty } from './schemas/faculty.schema';

@ApiTags('faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(private facultiesService: FacultiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new faculty' })
  @ApiBody({ type: CreateFacultyDto })
  @ApiResponse({ status: 201, description: 'Faculty created', type: Faculty })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultiesService.create(createFacultyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all faculties' })
  @ApiResponse({ status: 200, description: 'List of faculties', type: [Faculty] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.facultiesService.findAll();
  }
}


