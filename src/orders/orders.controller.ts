import { OrdersService } from './orders.service';
import { Body, Controller, Post, UseGuards, Get, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NewOrderDto } from 'src/orders/new-order.dto';
import {
  Param,
  Patch,
  Put,
  Query,
  Request,
  Res,
} from '@nestjs/common/decorators';
import { createOkResponse } from 'utils/createResponse';
import { DiscountCodeService } from 'src/discount-codes/discount-codes.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() param: { skip: number; limit: number },
    @Request() req,
  ) {
    const data = await this.ordersService.findAll(req.user.id, param);
    return createOkResponse(null, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createNewOrder(@Body() newOrderDto: NewOrderDto, @Request() req) {
    const data = await this.ordersService.createNewOrder(newOrderDto, req.user);
    return createOkResponse(null, data);
  }

  @Get('/verify')
  async verify(
    @Query('Authority') authority: string,
    @Query('Status') status: 'OK' | 'NOK',
    @Res() res,
  ) {
    const order = await this.ordersService.verify(authority, status);
    return res.redirect(
      `${process.env.FRONTEND_BASE_URL}/panel/payments/verify?status=${status}&code=${order.authority}`,
    );
  }

  @Put('/confirm/:id')
  async confirmOrder(@Param('id') orderId: number, @Res() res) {
    const order = await this.ordersService.confirmOrder(orderId);
    return res.redirect(
      `${process.env.FRONTEND_BASE_URL}/panel/payments/verify?status=OK&code=${order.invoiceId}`,
    );
  }

  @Put('/failed/:id')
  async failedOrder(@Param('id') orderId: number, @Res() res) {
    const order = await this.ordersService.failedOrder(orderId);
    return res.redirect(
      `${process.env.FRONTEND_BASE_URL}/panel/payments/verify?status=NOK&code=${order.invoiceId}`,
    );
  }

  @Get('/usdt-price')
  async getUsdtPrice() {
    const result = await this.ordersService.getUsdtPrice();
    return createOkResponse(null, result);
  }

  @Post('/ipn')
  async handleIPN(@Body() data: any) {
    console.log('IPN: ', data);
    // const response = await this.ordersService.createNewOrder(newOrderDto, req.user)
    //   return createOkResponse(null, challenges);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param('id') orderId, @Request() req) {
    const data = await this.ordersService.findOne(orderId);
    return createOkResponse(null, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/txid')
  async updateTXID(
    @Body('txid') txid: string,
    @Param('id') orderId: number,
    @Request() req,
  ) {
    const data = await this.ordersService.updateTxid(orderId, txid);
    return createOkResponse(null, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:challengeId/apply-discount/:discountCode')
  async applyDiscountToOrder(
    @Param('challengeId') challengeId: number,
    @Param('discountCode') discountCode: string,
  ) {
    const updatedPrice = await this.ordersService.getUpdatedPrice(challengeId, discountCode);
    return createOkResponse(null, { updatedPrice });
  }
}
