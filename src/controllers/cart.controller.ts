import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CartService } from 'src/services/cart.service';
import { userRequestType } from 'src/types/requests/user.request';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    getCartItems(
        @Request()
        req: userRequestType,
    ) {
        return this.cartService.getCartItems({
            userId: req.user.id,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    addProductToCart(
        @Request()
        req: userRequestType,
        @Body('productId') productId: string,
    ) {
        return this.cartService.addProductToCart({
            userId: req.user.id,
            productId,
        });
    }
}
