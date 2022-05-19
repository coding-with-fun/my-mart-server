import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import Cart from 'src/models/cart.model';
import Product from 'src/models/product.model';
import User from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Cart, Product])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export default class UserModule {}
