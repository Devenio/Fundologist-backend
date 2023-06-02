import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Servers } from 'entities/Servers';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Servers])],
  providers: [ServersService],
  controllers: [ServersController]
})
export class ServersModule {}
