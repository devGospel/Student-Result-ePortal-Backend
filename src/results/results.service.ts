import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Result } from './schemas/result.schema';
import { Student } from '../students/schemas/student.schema';
import { Course } from '../courses/schemas/course.schema';
import { CreateResultDto } from './dtos/create-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Result.name) private resultModel: Model<Result>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    const { studentId, courseCode, score, semester, session } = createResultDto;

    // Validate that studentId and courseCode are valid ObjectIds
    if (!Types.ObjectId.isValid(studentId)) {
      throw new BadRequestException('Invalid studentId format');
    }
    if (!Types.ObjectId.isValid(courseCode)) {
      throw new BadRequestException('Invalid courseCode format');
    }

    // Validate student and course existence
    const student = await this.studentModel.findById(studentId).exec();
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    const course = await this.courseModel.findById(courseCode).exec();
    if (!course) {
      throw new BadRequestException('Course not found');
    }

    // Calculate grade based on score
    const grade = this.calculateGrade(score);

    const createdResult = new this.resultModel({
      studentId: new Types.ObjectId(studentId),
      courseCode: new Types.ObjectId(courseCode),
      score,
      semester,
      session,
      grade,
    });

    const result = await createdResult.save();

    // Update student's CGPA
    await this.updateStudentCgpa(new Types.ObjectId(studentId));

    return result;
  }

  async findAll(): Promise<Result[]> {
    return this.resultModel
      .find()
      .populate('studentId', 'studentId firstName lastName')
      .populate('courseCode', 'code title')
      .exec();
  }

  async findByStudent(studentId: string): Promise<Result[]> {
    if (!Types.ObjectId.isValid(studentId)) {
      throw new BadRequestException('Invalid studentId format');
    }
    return this.resultModel
      .find({ studentId: new Types.ObjectId(studentId) })
      .populate('studentId', 'studentId firstName lastName')
      .populate('courseCode', 'code title')
      .exec();
  }

  private calculateGrade(score: number): string {
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    if (score >= 45) return 'D';
    if (score >= 40) return 'E';
    return 'F';
  }

  private async updateStudentCgpa(studentId: Types.ObjectId): Promise<void> {
    const results = await this.resultModel
      .find({ studentId })
      .populate('courseCode')
      .exec();

    let totalPoints = 0;
    let totalUnits = 0;

    results.forEach((result) => {
      const course = result.courseCode as any; // Type assertion for populated course
      if (course) {
        const gradePoint = this.getGradePoint(result.grade);
        totalPoints += gradePoint * course.creditUnits;
        totalUnits += course.creditUnits;
      }
    });

    const cgpa = totalUnits > 0 ? Number((totalPoints / totalUnits).toFixed(2)) : 0;

    await this.studentModel.updateOne(
      { _id: studentId },
      { $set: { cgpa } },
    ).exec();
  }

  private getGradePoint(grade: string): number {
    const gradePoints = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
    return gradePoints[grade] || 0;
  }
}