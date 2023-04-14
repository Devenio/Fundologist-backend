import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function createResponse(
  statusCode: HttpStatus,
  message: string,
  data: any = null,
  error: any = null,
) {
  return {
    statusCode,
    message,
    data,
    error
  }
}

export function createOkResponse(
  message: string,
  data: any = null
) {
  return {
    statusCode: HttpStatus.OK,
    message,
    data,
    error: null
  }
}
