import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FundMailerService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  async sendMail(to: string, subject: string, template: string, context: object) {
    const res = await this.mailerService.sendMail({
      to,
      subject,
      template,
      context
    });

    return res;
  }
}
