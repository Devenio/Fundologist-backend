import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountCode } from 'entities/DiscountCodes';
import { Repository } from 'typeorm';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CreateDiscountCodeDto } from './discount-code.dto';

@Injectable()
export class DiscountCodeService {
  constructor(
    @InjectRepository(DiscountCode)
    private readonly discountCodeRepository: Repository<DiscountCode>,
  ) {}

  async generateDiscountCode(
    codeData: CreateDiscountCodeDto,
  ): Promise<DiscountCode> {
    const newDiscountCode = this.discountCodeRepository.create(codeData);
    return this.discountCodeRepository.save(newDiscountCode);
  }

  async getDiscountCodes(): Promise<DiscountCode[]> {
    return this.discountCodeRepository.find();
  }

  async getDiscountCodeById(id: number): Promise<DiscountCode | undefined> {
    return this.discountCodeRepository.findOne({ where: { id } });
  }

  async getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined> {
    const currentDate = new Date();
    const discountCode = await this.discountCodeRepository
      .createQueryBuilder('discountCode')
      .where('discountCode.code = :code', { code })
      .andWhere('discountCode.startDate <= :currentDate', { currentDate })
      .andWhere('discountCode.endDate >= :currentDate', { currentDate })
      .getOne();
  
    return discountCode;
  }
  

  // Add more methods as needed
}
