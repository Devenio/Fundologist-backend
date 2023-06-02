import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createOkResponse } from 'utils/createResponse';
import { ServersService } from './servers.service';

@UseGuards(JwtAuthGuard)
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get()
  async findAll() {
    const servers = await this.serversService.findAll();
    return createOkResponse('', servers);
  }
}
