import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function createResponse(
  res: Response,
  statusCode: HttpStatus,
  message: string,
  data: any = null,
  error: any = null,
) {
  const responseBody = { statusCode, message, data, error };

  res.status(statusCode).json(responseBody);
}
