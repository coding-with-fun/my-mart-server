import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import Product from 'src/models/product.model';
import User from 'src/models/user.model';
import { addProductToCartRequestType } from 'src/types/requests/cart.request';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async addProductToCart(params: addProductToCartRequestType) {
        const userId = parseInt(params.userId);
        const productId = parseInt(params.productId);

        const product = await this.productRepository.findOne({
            where: {
                id: productId,
            },
        });

        if (product) {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                },
                relations: {
                    cart: true,
                },
            });

            const userProductIndex = _.findIndex(user.cart, ['id', productId]);

            if (userProductIndex > -1) {
                console.log('PRODUCT >> ', user.cart[userProductIndex].count);
                user.cart[userProductIndex].count =
                    user.cart[userProductIndex].count + 1;

                console.log('PRODUCT >> ', user.cart[userProductIndex].count);
            } else {
                product.count = 1;
                user.cart.push(product);
            }

            console.log(user, userProductIndex);
            return await this.userRepository.save(user);
        }
    }
}