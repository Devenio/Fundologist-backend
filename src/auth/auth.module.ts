import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'entities/User';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { config } from 'dotenv';
import { GoogleStrategy } from './google.strategy';

config()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: '60s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, LocalStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
