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
      description: data.description,
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
    const withdraw = await this.withdrawsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      skip: options.skip,
      take: options.limit
    });

    return withdraw;
  }
}
