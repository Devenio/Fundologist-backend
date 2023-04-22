import { OrdersService } from './orders.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { NewOrderDto } from 'src/orders/new-order.dto';
import { Request } from '@nestjs/common/decorators';
import { createOkResponse } from 'utils/createResponse';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/new')
  async createNewOrder(@Body() newOrderDto: NewOrderDto, @Request() req) {
    const response = await this.ordersService.createNewOrder(
      newOrderDto,
      req.user,
    );
    console.log(response);
    return createOkResponse(null, response['invoice_url']);
  }

  @Post('/ipn')
  async handleIPN(@Body() data: any) {
    // const response = await this.ordersService.createNewOrder(newOrderDto, req.user)
    //   return createOkResponse(null, challenges);
  }
}
