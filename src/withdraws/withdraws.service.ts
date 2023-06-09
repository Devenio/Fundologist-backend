import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWithdraws } from 'entities/UserWithdraws';
import { Repository } from 'typeorm';
import { NewWithdrawDto } from './new-withdraw.dto';

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectRepository(UserWithdraws)
    private withdrawsRepository: Repository<UserWithdraws>,
  ) {}

  async add(data: NewWithdrawDto, userId: number) {
    const withdraw = await this.withdrawsRepository.create({
      description: '',
      walletAddress: data.walletAddress,
    });
    withdraw.account = { id: data.accountId } as any;
    withdraw.user = { id: userId } as any;

    return this.withdrawsRepository.save(withdraw);
  }

  async findAll(
    userId: number,
    options: { skip?: number; limit?: number } = { skip: 0, limit: 50 },
  ) {
    console.log(options);
    const withdraws = await this.withdrawsRepository
      .createQueryBuilder('withdraw')
      .leftJoinAndSelect('withdraw.account', 'account')
      .where('withdraw.user.id = :userId', { userId })
      .skip(options.skip || 0)
      .take(options.limit || 50)
      .orderBy('withdraw.createdAt', 'DESC')
      .getMany();

    return withdraws;
  }

  async findOne(id) {
    const res = await this.withdrawsRepository.findOne({
      where: {id}
    })
    return res;
  }

  // Admin Services
  async updateStatus(id, status) {
    const res = await this.findOne(id);
    res.status = status;

    return this.withdrawsRepository.save(res);
  }
  async updateTaxId(id, taxId) {
    const res = await this.findOne(id);
    res.taxId = taxId;

    return this.withdrawsRepository.save(res);
  }
}
