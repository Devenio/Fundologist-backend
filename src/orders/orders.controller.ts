import { OrdersService } from './orders.service';
import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { NewOrderDto } from 'src/orders/new-order.dto';
import { Param, Patch, Request } from '@nestjs/common/decorators';
import { createOkResponse } from 'utils/createResponse';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Body() body: {skip: number, limit: number}, @Request() req) {
    const data = await this.ordersService.findAll(req.user.id, body);
    return createOkResponse(null, data);
  }

  @Post('/new') 
  async createNewOrder(@Body() newOrderDto: NewOrderDto, @Request() req) {
    const data = await this.ordersService.createNewOrder(newOrderDto, req.user);
    return createOkResponse(null, data);
  }
  
  @Get('/verify/:authority')
  async verify(@Param("authority") authority: string) {
    const data = await this.ordersService.verify(authority);
    return createOkResponse(null, data);
  }

  @Patch('/confirm/:id')
  async confirmOrder(@Param("id") orderId: number) {
    const order = await this.ordersService.confirmOrder(orderId);
    return createOkResponse(null, order);
  }

  @Patch('/failed/:id')
  async failedOrder(@Param("id") orderId: number) {
    const order = await this.ordersService.failedOrder(orderId);
    return createOkResponse(null, order);
  }

  @Get('/usdt-price')
  async getUsdtPrice() {
    console.log("Get usdt price ");
    const result = await this.ordersService.getUsdtPrice()
    return createOkResponse(null, result);
  }

  @Post('/ipn')
  async handleIPN(@Body() data: any) {
    console.log(data);
    // const response = await this.ordersService.createNewOrder(newOrderDto, req.user)
    //   return createOkResponse(null, challenges);
  }
}
