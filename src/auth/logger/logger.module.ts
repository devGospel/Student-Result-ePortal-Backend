import { Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from '../middleware/request-logger.middleware';

@Module({
  providers: [RequestLoggerMiddleware],
  exports: [RequestLoggerMiddleware],
})
export class LoggerModule {}