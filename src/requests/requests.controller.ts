import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { createOkResponse } from 'utils/createResponse';
import { CreateRequestDto } from './create-request.dto';
import { RequestsService } from './requests.service';

@UseGuards(JwtAuthGuard)
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto, @Request() req) {
    const request = await this.requestsService.create(
      createRequestDto,
      req.user.id,
    );
    return createOkResponse('درخواست شما با موفقیت ارسال شد', request);
  }

  @Get()
  async findAll(@Request() req) {
    const request = await this.requestsService.findAll(req.user.id);
    return createOkResponse('درخواست شما با موفقیت ارسال شد', request);
  }
}
