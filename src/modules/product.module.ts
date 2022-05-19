import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product.controller';
import Brand from 'src/models/brand.model';
import Cart from 'src/models/cart.model';
import Product from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, Product, Brand])],
    providers: [ProductService],
    controllers: [ProductController],
})
export default class ProductModule {}
