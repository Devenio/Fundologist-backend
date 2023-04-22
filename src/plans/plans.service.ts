import { Plan } from './../../entities/Plan';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './create-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const plan = await this.planRepository.create(createPlanDto);
    return this.planRepository.save(plan)
  }

  async findAll() {
    const plans = await this.planRepository.find();
    return plans
  }
}
