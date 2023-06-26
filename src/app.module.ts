import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UserAccounts } from 'entities/UserAccounts';
import { Challenge } from 'entities/Challenge';
import { Ticket } from 'entities/Ticket';
import { UserProfile } from 'entities/UserProfile';
import { TicketMessage } from '../entities/TicketMessage';
import { User } from '../entities/User';
import { UserRequests } from '../entities/UserRequests';
import { Plan } from './../entities/Plan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { PlansModule } from './plans/plans.module';
import { ChallengesModule } from './challenges/challenges.module';
import { AccountsModule } from './accounts/accounts.module';
import { UserOrders } from 'entities/UserOrders';
import { UserWithdraws } from 'entities/UserWithdraws';
import { WithdrawsModule } from './withdraws/withdraws.module';
import { PaymentModule } from './payment/payment.module';
import { OrdersModule } from './orders/orders.module';
import { Servers } from 'entities/Servers';
import { ProfileModule } from './profile/profile.module';
import { Files } from 'entities/FIles';
import { RequestLoggingMiddleware } from './middlewares/request-logging.middleware';
import * as cors from 'cors';
import { ServersModule } from './servers/servers.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { FundMailerModule } from './fundMailer/fundMailer.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
// import { TelegrafModule } from 'nestjs-telegraf';

if(process.env.NODE_ENV !== 'production') {
  const envConfig = config({ path: '.env' });
  if (envConfig.error) {
    throw new Error(`Error loading .env file: ${envConfig.error}`);
  }
}

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Challenge, 
        Files,
        Plan,
        Servers,
        TicketMessage,
        Ticket,
        User,
        UserAccounts,
        UserOrders,
        UserProfile,
        UserRequests,
        UserWithdraws,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TelegrafModule.forRoot({
    //   token: process.env.TELEGRAM_BOT_TOKEN,
    // }),
    // TelegramBotModule,
    UsersModule,
    AuthModule,
    TicketsModule,
    MessagesModule,
    RequestsModule,
    PlansModule,
    ChallengesModule,
    AccountsModule,
    WithdrawsModule,
    PaymentModule,
    OrdersModule,
    ProfileModule,
    ServersModule,
    FundMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if(process.env.NODE_ENV !== 'production') {
      consumer.apply(cors()).forRoutes('*');
    }
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
