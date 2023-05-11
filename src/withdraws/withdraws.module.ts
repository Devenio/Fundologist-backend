import { Module } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { WithdrawsController } from './withdraws.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWithdraws } from 'entities/UserWithdraws';

@Module({
  imports: [TypeOrmModule.forFeature([UserWithdraws])],
  providers: [WithdrawsService],
  controllers: [WithdrawsController]
})
export class WithdrawsModule {}
