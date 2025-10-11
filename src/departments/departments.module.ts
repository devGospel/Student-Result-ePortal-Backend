import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Department, DepartmentSchema } from './schemas/department.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }])],
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
})
export class DepartmentsModule {}