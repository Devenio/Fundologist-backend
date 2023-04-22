import { Module } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { WithdrawsController } from './withdraws.controller';

@Module({
  providers: [WithdrawsService],
  controllers: [WithdrawsController]
})
export class WithdrawsModule {}
