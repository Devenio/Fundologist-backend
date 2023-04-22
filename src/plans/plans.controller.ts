import { CreatePlanDto } from './create-plan.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { PlansService } from './plans.service';
import { createOkResponse } from 'utils/createResponse';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  async addPlan(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.plansService.create(createPlanDto);
    return createOkResponse('پلن با موفقیت اضافه شد', plan);
  }
}
