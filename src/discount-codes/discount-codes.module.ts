import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCode } from 'entities/DiscountCodes';
import { DiscountCodeController } from './discount-codes.controller';
import { DiscountCodeService } from './discount-codes.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCode])],
  providers: [DiscountCodeService],
  controllers: [DiscountCodeController],
})
export class DiscountCodeModule {}