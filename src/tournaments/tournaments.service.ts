import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from 'entities/Tournament';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,

    private readonly usersService: UsersService,
  ) {}

  async attend(userId, tournamentId) {
    const tournament = await this.tournamentRepository.findOne({
      where: {
        id: tournamentId,
      },
    });

    if (!tournament) {
      throw new NotFoundException('تورنومنتی با این آیدی پیدا نشد');
    }

    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('کاربری با این آیدی پیدا نشد');
    }
    if (user.tournamentId) {
      throw new NotAcceptableException(
        'شما در حال حاضر در این تورنومنت هستید.',
      );
    }
    if (!user.isAuthenticated) {
      throw new NotAcceptableException(
        'برای شرکت در تورنومنت ابتدا باید احراز هویت کنید.',
      );
    }
    console.log(tournament)
    user.tournament = { id: tournament.id } as any;
    const res = await this.usersService.update(user);

    return res;
  }
}
