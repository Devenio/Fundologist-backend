import { FundMailerController } from './fundMailer.controller';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.LIARA_SMTP_HOST,
          port: process.env.LIARA_SMTP_PORT,
          auth: {
            user: process.env.LIARA_SMTP_USERNAME,
            pass: process.env.LIARA_SMTP_PASSWORD,
          },
        },
        defaults: {
          from: 'support@fundologist.ir',
        },
        template: {
          dir: __dirname + '\\templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [],
  controllers: [FundMailerController],
})
export class FundMailerModule {}
