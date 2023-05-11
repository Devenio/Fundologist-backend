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

  // @Get()
  // async findAll() {
  //   const data = await this.ordersService.createNewOrder(newOrderDto, req.user);
  //   console.log(data);
  //   return createOkResponse(null, data);
  // }

  @Post('/new')
  async createNewOrder(@Body() newOrderDto: NewOrderDto, @Request() req) {
    const data = await this.ordersService.createNewOrder(newOrderDto, req.user);
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

  @Post('/ipn')
  async handleIPN(@Body() data: any) {
    console.log(data);
    // const response = await this.ordersService.createNewOrder(newOrderDto, req.user)
    //   return createOkResponse(null, challenges);
  }
}
