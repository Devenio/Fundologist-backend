import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegramBotController } from './telegram-bot.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TelegramBotService, UsersService],
  controllers: [TelegramBotController]
})
export class TelegramBotModule {}
