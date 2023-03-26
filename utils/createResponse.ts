import { HttpStatus } from '@nestjs/common';

export function createResponse(
  statusCode: number,
  message: string,
  data: any = null,
  error: any = null,
) {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
    error: error,
  };
}
