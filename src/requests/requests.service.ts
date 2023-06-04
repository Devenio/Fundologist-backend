import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRequests } from 'entities/UserRequests';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(UserRequests)
    private requestsRepository: Repository<UserRequests>,
  ) {}

  async create(
    createRequestDto: CreateRequestDto,
    userId: number,
  ): Promise<UserRequests> {
    const { type, description, accountId } = createRequestDto;

    const request = this.requestsRepository.create({ type, description });
    request.user = { id: userId } as any;
    request.account = { id: accountId } as any; 
    const savedRequest = await this.requestsRepository.save(request);

    return savedRequest;
  }

  async findAll(userId: number, { skip, limit }): Promise<UserRequests[]> {
    const requests = await this.requestsRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.account', 'account')
      .where('request.user.id = :userId', { userId })
      .skip(skip)
      .take(limit)
      .orderBy('request.createdAt', 'DESC')
      .getMany();

    return requests;
  }
}
