import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';

enum ACTION_STEPS {
  STARTER,
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  LOGGED_IN,
}

enum START_BUTTONS {
  LOGIN = 'ورود به حساب کاربری 👤',
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
    await ctx.reply('به ربات پراپ فرم فاندولوژیست خوش آمدید 😊');

    await ctx.reply('برای استفاده از ربات لطفا ابتدا وارد شوید:', {
      reply_markup: {
        keyboard: [[{ text: START_BUTTONS.LOGIN }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  @Hears(START_BUTTONS.LOGIN)
  async onLogin(ctx: Context) {
    await ctx.reply('لطفا ایمیل خود را وارد کنید:');

    this.session.actionStep = ACTION_STEPS.LOGIN_EMAIL;
  }

  @On('text')
  async onText(ctx: Context) {
    if (this.session.actionStep === ACTION_STEPS.LOGIN_EMAIL) {
      await this.onLoginEmailHandler(ctx, ctx.message['text']);
    } else if (this.session.actionStep === ACTION_STEPS.LOGIN_PASSWORD) {
        await ctx.reply(ctx.message['text'])
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
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.validatePassword(password)) {
      await this.usersService.addTelegramId(email, ctx.from.id);
      await ctx.reply(
        `${user.firstName} عزیز به ربات فاندولوژیست خوش اومدی 😃`,
        {
          reply_markup: {
            keyboard: [
              [{ text: 'Option 1' }, { text: 'Option 2' }],
              [{ text: 'Option 3' }, { text: 'Option 4' }],
            ],
            resize_keyboard: true,
          },
        },
      );
      this.session.actionStep = ACTION_STEPS.LOGGED_IN;
      this.session.email = '';
    } else {
      // Failed login
      await ctx.reply('❌ ایمیل یا پسورد وارد شده اشتباه میباشد. ❌');

      // Show login keyboard button again
      await ctx.reply('لطفا دوباره امتحان کنید:', {
        reply_markup: {
          keyboard: [[{ text: START_BUTTONS.LOGIN }]],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      });
      this.session.actionStep = ACTION_STEPS.STARTER;
      this.session.email = '';
    }
  }
}
