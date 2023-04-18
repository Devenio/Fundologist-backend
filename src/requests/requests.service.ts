import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRequests } from 'entities/UserRequests';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(UserRequests) private requestsRepository: Repository<UserRequests>,
  ) {}

  async create(
    createRequestDto: CreateRequestDto,
    userId: number,
  ): Promise<UserRequests> {
    const { type, description } = createRequestDto;

    const request = this.requestsRepository.create({ type, description });
    request.user = { id: userId } as any;
    const savedRequest = await this.requestsRepository.save(request);

    return savedRequest;
  }

  async findAll(userId: number): Promise<UserRequests[]> {
    const requests = await this.requestsRepository.find({
      where: { user: { id: userId } },
    });

    return requests;
  }
}
