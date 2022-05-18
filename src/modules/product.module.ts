import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product.controller';
import Brand from 'src/models/brand.model';
import Product from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand])],
    providers: [ProductService],
    controllers: [ProductController],
})
export default class ProductModule {}
