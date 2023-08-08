import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateDiscountCodeDto } from './discount-code.dto';
import { DiscountCodeService } from './discount-codes.service';

@UseGuards(JwtAuthGuard)
@Controller('discount-codes')
export class DiscountCodeController {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @Get()
  async getAllDiscountCodes() {
    return this.discountCodeService.getDiscountCodes();
  }

  @Get(':id')
  async getDiscountCodeById(@Param('id') id: number) {
    return this.discountCodeService.getDiscountCodeById(id);
  }

  @Post()
  async createDiscountCode(@Body() createDiscountCodeDto: CreateDiscountCodeDto) {
    return this.discountCodeService.generateDiscountCode(createDiscountCodeDto);
  }
}
