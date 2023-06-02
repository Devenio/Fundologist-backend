import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Servers } from 'entities/Servers';
import { Repository } from 'typeorm';

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(Servers) private serversRepository: Repository<Servers>,
  ) {}

  async findAll(): Promise<Servers[]> {
    return this.serversRepository.find();
  }
}
