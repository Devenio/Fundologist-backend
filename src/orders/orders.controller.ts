import { OrdersService } from './orders.service';
import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
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

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Body() body: { skip: number; limit: number }, @Request() req) {
    const data = await this.ordersService.findAll(req.user.id, body);
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
    console.log(authority, status);
    const order = await this.ordersService.verify(authority, status);
    return res.redirect(
      `${process.env.FRONTEND_BASE_URL}/panel/payments/verify?status=${status}&authority=${order.authority}`,
    );
  }

  @Put('/confirm/:id')
  async confirmOrder(@Param('id') orderId: number) {
    const order = await this.ordersService.confirmOrder(orderId);
    return createOkResponse(null, order);
  }

  @Put('/failed/:id')
  async failedOrder(@Param('id') orderId: number) {
    const order = await this.ordersService.failedOrder(orderId);
    return createOkResponse(null, order);
  }

  @Get('/usdt-price')
  async getUsdtPrice() {
    const result = await this.ordersService.getUsdtPrice();
    return createOkResponse(null, result);
  }

  @Post('/ipn')
  async handleIPN(@Body() data: any) {
    // const response = await this.ordersService.createNewOrder(newOrderDto, req.user)
    //   return createOkResponse(null, challenges);
  }
}
