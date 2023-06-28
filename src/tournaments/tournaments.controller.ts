import {
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createOkResponse } from 'utils/createResponse';
import { TournamentsService } from './tournaments.service';

@UseGuards(JwtAuthGuard)
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post('/:id')
  async attend(@Request() req, @Param('id') tournamentId) {
    const res = await this.tournamentsService.attend(req.user.id, tournamentId);
    return createOkResponse('شما با موفقیت به تورنومنت اضافه شدید', res);
  }
}
