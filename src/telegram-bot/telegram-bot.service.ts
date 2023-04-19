import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';
import { PANEL_BUTTONS, START_BUTTONS } from './buttons';
import { loginMarkup, panelMarkup } from './reply-markup';

enum ACTION_STEPS {
  STARTER,
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  LOGGED_IN,
}

@Update()
@Injectable()
export class TelegramBotService {
  session: {
    actionStep: ACTION_STEPS;
    email: string;
    password: string;
  } = {
    actionStep: ACTION_STEPS.STARTER,
    email: '',
    password: '',
  };

  constructor(private readonly usersService: UsersService) {}

  @Start()
  async startCommand(ctx: Context) {
    const fromId = ctx.from.id;
    const user = await this.usersService.findOneByTelegramUserId(fromId);

    if (user) {
      await ctx.reply(
        `
        سلام ${user.firstName} عزیز.\n\n
        به ربات فاندولوژیست خوش اومدی
      `,
        { reply_markup: panelMarkup },
      );
    } else {
      await ctx.reply('');

      await ctx.reply(
        `به ربات پراپ فرم فاندولوژیست خوش آمدید 😊\n
        برای استفاده از ربات لطفا ابتدا وارد شوید:`,
        {
          reply_markup: loginMarkup,
        },
      );
    }
  }

  @On('text')
  async onText(ctx: Context) {
    if (this.session.actionStep === ACTION_STEPS.LOGIN_EMAIL) {
      await this.onLoginEmailHandler(ctx, ctx.message['text']);
    } else if (this.session.actionStep === ACTION_STEPS.LOGIN_PASSWORD) {
      await ctx.reply(ctx.message['text']);
      await this.onLoginPasswordHandler(ctx, ctx.message['text']);
    }
  }

  // Handlers
  async onLoginEmailHandler(ctx: Context, email: string) {
    this.session.email = email;
    await ctx.reply('لطفا پسورد خود را وارد کنید :');
    this.session.actionStep = ACTION_STEPS.LOGIN_PASSWORD;
  }

  async onLoginPasswordHandler(ctx: Context, password: string) {
    const email = this.session.email;

    // Authenticate user
    const user = await this.usersService.findOneByEmailAddSelectPassword(email);
    if (!user) await ctx.reply('❌ ایمیل یا پسورد وارد شده اشتباه میباشد. ❌');

    const isPasswordValidated = await user.validatePassword(password);
    if (isPasswordValidated) {
      await this.usersService.addTelegramId(email, ctx.from.id);
      await ctx.reply(
        `${user.firstName} عزیز به ربات فاندولوژیست خوش اومدی 😃`,
        {
          reply_markup: panelMarkup,
        },
      );
      this.session.actionStep = ACTION_STEPS.LOGGED_IN;
      this.session.email = '';
    } else {
      // Failed login
      await ctx.reply('❌ ایمیل یا پسورد وارد شده اشتباه میباشد. ❌');

      // Show login keyboard button again
      await ctx.reply('لطفا دوباره امتحان کنید:', {
        reply_markup: loginMarkup,
      });
      this.session.actionStep = ACTION_STEPS.STARTER;
      this.session.email = '';
    }
  }

  // Panel Button Handlers
  @Hears(START_BUTTONS.LOGIN)
  async onLogin(ctx: Context) {
    await ctx.reply('لطفا ایمیل خود را وارد کنید:');

    this.session.actionStep = ACTION_STEPS.LOGIN_EMAIL;
  }

  @Hears(PANEL_BUTTONS.LOGOUT)
  async onLogout(ctx: Context) {
    console.log('logout');
    this.session.actionStep = ACTION_STEPS.STARTER;
    await this.usersService.deleteTelegramUserId(ctx.from.id);
    await ctx.reply('شما از حساب خود خارج شدید.', {
      reply_markup: loginMarkup,
    });
  }
}
