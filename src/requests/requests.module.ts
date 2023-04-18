import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { UserRequests } from 'entities/UserRequests';

@Module({
  imports: [TypeOrmModule.forFeature([UserRequests])],
  providers: [RequestsService],
  controllers: [RequestsController]
})
export class RequestsModule {}
