import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers, body } = req;
    const start = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${originalUrl} | Headers: ${JSON.stringify(headers)} | Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(
        `Response: ${method} ${originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms`,
      );
    });

    next();
  }
}