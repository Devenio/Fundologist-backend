import { CreatePlanDto } from './create-plan.dto';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { createOkResponse } from 'utils/createResponse';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  async addPlan(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.plansService.create(createPlanDto);
    return createOkResponse('پلن با موفقیت اضافه شد', plan);
  }

  @Get()
  async findAll() {
    const plans = await this.plansService.findAll();
    return createOkResponse(null, plans);
  }
}
