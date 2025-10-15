import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { DepartmentsModule } from './departments/departments.module';
import { CoursesModule } from './courses/courses.module';
import { ResultsModule } from './results/results.module';
import { LoggerModule } from './auth/logger/logger.module';
import { FacultiesModule } from './faculties/faculties.module';
import { databaseConfig } from './config/db.config';
import { RequestLoggerMiddleware } from './auth/middleware/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync(databaseConfig),
    AuthModule,
    UsersModule,
    StudentsModule,
    DepartmentsModule,
    CoursesModule,
    ResultsModule,
    LoggerModule,
    FacultiesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}