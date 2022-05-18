import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CartService } from 'src/services/cart.service';
import { getUserIdRequestType } from 'src/types/requests/user.request';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    addProductToCart(
        @Request()
        req: {
            user: getUserIdRequestType;
        },
        @Body('productId') productId: string,
    ) {
        return this.cartService.addProductToCart({
            userId: req.user.id,
            productId,
        });
    }
}
