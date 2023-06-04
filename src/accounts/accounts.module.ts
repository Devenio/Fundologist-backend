import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccounts } from 'entities/UserAccounts';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccounts])],
  providers: [AccountsService],
  controllers: [AccountsController]
})
export class AccountsModule {}
