import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from 'src/services/product.service';
import {
    createProductBodyType,
    getAllProductsQueryType,
} from 'src/types/requests/product.request';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/all')
    getAllProducts(@Query() query: getAllProductsQueryType) {
        return this.productService.getAllProducts(query);
    }

    @Post('/add')
    addNewProduct(@Body() body: createProductBodyType) {
        return this.productService.addNewProduct(body);
    }

    @Get()
    getCurrentProductDetails() {
        return this.productService.getCurrentProductDetails();
    }
}
