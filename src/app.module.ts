import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
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

const envConfig = config({ path: '.env' });
if (envConfig.error) {
  throw new Error(`Error loading .env file: ${envConfig.error}`);
}

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        // template: {
        //   dir: '/templates',
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Ticket,
        TicketMessage,
        UserAccounts,
        Challenge,
        Plan,
        UserRequests,
        UserProfile,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TicketsModule,
    MessagesModule,
    RequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
