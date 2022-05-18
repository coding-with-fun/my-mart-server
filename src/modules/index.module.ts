import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import BrandModule from './brand.module';
import CartModule from './cart.module';
import ProductModule from './product.module';
import UserModule from './user.module';

@Module({
    imports: [AuthModule, CartModule, UserModule, ProductModule, BrandModule],
})
export default class IndexModule {}
