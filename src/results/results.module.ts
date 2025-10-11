import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controllers';
import { Result, ResultSchema } from './schemas/result.schema';
import { StudentsModule } from '../students/students.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    StudentsModule, // Import StudentsModule to provide StudentModel
    CoursesModule,  // Import CoursesModule to provide CourseModel
  ],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}