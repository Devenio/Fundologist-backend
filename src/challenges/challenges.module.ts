import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'entities/Challenge';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengesService],
  controllers: [ChallengesController]
})
export class ChallengesModule {}
