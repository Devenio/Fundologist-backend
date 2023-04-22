import { Controller, Get, Param } from '@nestjs/common';
import { createOkResponse } from 'utils/createResponse';
import { ChallengesService } from './challenges.service';

@Controller('challenges')
export class ChallengesController {
    constructor(private readonly challengesService: ChallengesService) {}
  
    @Get('/:id')
    async findAll(@Param('id') planId: number) {
      const challenges = await this.challengesService.findAll(planId);
      return createOkResponse(null, challenges);
    }
}
