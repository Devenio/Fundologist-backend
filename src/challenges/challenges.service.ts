import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'entities/Challenge';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from './create-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
    const {
      accountGrowthTarget,
      dailyDrawdown,
      firstTarget,
      fund,
      leverage,
      maximumAccountGrowth,
      maximumRisk,
      minimumTradingDay,
      overallDrawdown,
      planId,
      price,
      refund,
      secondTarget,
    } = createChallengeDto;
    const challenge = await this.challengeRepository.create({
      accountGrowthTarget,
      dailyDrawdown,
      firstTarget,
      fund,
      leverage,
      maximumAccountGrowth,
      maximumRisk,
      minimumTradingDay,
      overallDrawdown,
      price,
      refund,
      secondTarget,
    });
    return this.challengeRepository.save(challenge);
  }
}
