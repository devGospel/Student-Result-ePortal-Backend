import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faculty } from './schemas/faculty.schema';

@Injectable()
export class FacultiesService {
  constructor(@InjectModel(Faculty.name) private facultyModel: Model<Faculty>) {}

  async create(createFacultyDto: any): Promise<Faculty> {
    const createdFaculty = new this.facultyModel(createFacultyDto);
    return createdFaculty.save();
  }

  async findAll(): Promise<Faculty[]> {
    return this.facultyModel.find().exec();
  }
}


