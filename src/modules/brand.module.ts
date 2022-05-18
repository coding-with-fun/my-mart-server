import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from 'src/controllers/brand.controller';
import Brand from 'src/models/brand.model';
import Product from 'src/models/product.model';
import { BrandService } from 'src/services/brand.service';

@Module({
    imports: [TypeOrmModule.forFeature([Brand, Product])],
    providers: [BrandService],
    controllers: [BrandController],
})
export default class BrandModule {}
