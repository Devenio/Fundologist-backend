import { MailerService } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'entities/User';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { config } from 'dotenv';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserAccounts } from 'entities/UserAccounts';
import { UserRequests } from 'entities/UserRequests';
import { UserWithdraws } from 'entities/UserWithdraws';
import { UserOrders } from 'entities/UserOrders';
import { ProfileService } from 'src/profile/profile.service';
import { Files } from 'entities/FIles';
import { UserProfile } from 'entities/UserProfile';

config()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAccounts, UserRequests, UserWithdraws, UserOrders, Files, UserProfile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ProfileService, JwtStrategy, LocalStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
