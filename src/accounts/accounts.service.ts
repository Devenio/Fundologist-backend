import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccounts } from 'entities/UserAccounts';
import { Repository } from 'typeorm';
import { NewAccountDto } from './create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(UserAccounts)
    private readonly accountRepository: Repository<UserAccounts>,
  ) {}

  async createAccount(newAccountDto: NewAccountDto) {
    const {
      platform,
      login,
      password,
      investorPassword,
      level,
      serverId,
      challengeId,
      userId
    } = newAccountDto;

    const account = this.accountRepository.create();
    account.platform = platform;
    account.login = login;
    account.password = password;
    account.investorPassword = investorPassword;
    account.level = level;
    account.server = { id: serverId } as any;
    account.challenge = { id: challengeId } as any;
    account.user = { id: userId } as any;

    return this.accountRepository.save(account);
  }
}
