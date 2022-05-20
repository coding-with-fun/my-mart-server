import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import Brand from 'src/models/brand.model';
import Product from 'src/models/product.model';
import {
    createProductBodyType,
    getAllProductsQueryType,
} from 'src/types/requests/product.request';
import { Repository } from 'typeorm';
import { pagination } from './pagination.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
    ) {}

    async getAllProducts(query: getAllProductsQueryType) {
        try {
            const page = _.get(query, 'page', 1);
            const limit = _.get(query, 'limit', 10);
            const orderField = _.get(query, 'orderField', 'id');
            const orderBy = _.get(query, 'orderBy', 'ASC');

            const [allProducts, count] =
                await this.productRepository.findAndCount({
                    relations: {
                        brand: true,
                    },
                    take: limit,
                    skip: (page - 1) * limit,
                    order: {
                        [orderField]: orderBy,
                    },
                });

            return {
                statusCode: 200,
                data: pagination(allProducts, count, page, limit),
                message: ['All products fetched.'],
                error: false,
            };
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: ['Internal server error.'],
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async addNewProduct(body: createProductBodyType) {
        try {
            const brandName = _.get(body, 'brand');

            const brand = await this.brandRepository.findOne({
                where: {
                    title: brandName,
                },
            });
            if (!brand) {
                return {
                    statusCode: 406,
                    message: ['Brand does not exist.'],
                    error: true,
                };
            } else {
                const newProduct = new Product();
                newProduct.brand = brand;
                newProduct.price = body.price;
                newProduct.title = body.title;

                await this.productRepository.save(newProduct);

                return {
                    statusCode: 200,
                    data: newProduct,
                    message: ['New user created.'],
                    error: false,
                };
            }
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: ['Internal server error.'],
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteProduct(params: any) {
        try {
            const productId = parseInt(params.productId);

            await this.productRepository.delete(productId);
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: ['Internal server error.'],
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getCurrentProductDetails() {
        return 'Product details fetched.';
    }
}
