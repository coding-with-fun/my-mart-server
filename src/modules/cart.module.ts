import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from 'src/controllers/cart.controller';
import Product from 'src/models/product.model';
import User from 'src/models/user.model';
import { CartService } from 'src/services/cart.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Product])],
    providers: [CartService],
    controllers: [CartController],
    exports: [CartService],
})
export default class CartModule {}
