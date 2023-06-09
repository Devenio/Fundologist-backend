import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { REQUEST_STATUSES } from 'entities/UserRequests';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
  async findAll(@Request() req, @Query() query: {skip: number, limit: number} = {skip: 0, limit: 15}) {
    const request = await this.requestsService.findAll(req.user.id, query);
    return createOkResponse('درخواست شما با موفقیت ارسال شد', request);
  }

  // Admin
  @UseGuards(IsAdminGuard)
  @Post('/:id')
  async update(@Param('id') requestId: number, @Body('status') status: REQUEST_STATUSES) {
    const res = await this.requestsService.updateStatus(requestId, status);
    return createOkResponse('', res);
  }
}
