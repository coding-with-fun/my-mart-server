import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Cart from 'src/models/cart.model';
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

        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) {}

    async addProductToCart(params: addProductToCartRequestType) {
        try {
            const userId = parseInt(params.userId);
            const productId = parseInt(params.productId);

            const product = await this.productRepository.findOne({
                where: {
                    id: productId,
                },
            });

            if (product) {
                const cartItem = await this.cartRepository.findOne({
                    where: {
                        user: {
                            id: userId,
                        },
                        product: {
                            id: productId,
                        },
                    },
                });

                if (!cartItem) {
                    const user = await this.userRepository.findOne({
                        where: {
                            id: userId,
                        },
                    });

                    const newCartItem = new Cart();

                    newCartItem.count = 1;
                    newCartItem.product = product;
                    newCartItem.user = user;

                    await this.cartRepository.save(newCartItem);

                    return {
                        statusCode: 200,
                        data: newCartItem,
                        message: ['Product added to the cart.'],
                        error: false,
                    };
                } else {
                    return {
                        statusCode: 406,
                        message: ['Product already added to the cart.'],
                        error: true,
                    };
                }
            } else {
                return {
                    statusCode: 406,
                    message: ['Product does not exist.'],
                    error: true,
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

    async removeProductFromCart(params: any) {
        try {
            const cartId = parseInt(params.cartId);

            const cart = await this.cartRepository.findOne({
                where: {
                    id: cartId,
                },
            });
            await this.cartRepository.remove(cart);

            return {
                statusCode: 200,
                message: ['Product removed from the cart.'],
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

    async changeProductCountInCart(params: any) {
        try {
            const cartId = parseInt(params.cartId);
            const itemCount = parseInt(params.itemCount);

            if (!itemCount) {
                return this.removeProductFromCart({
                    cartId,
                });
            } else {
                const cartItem = await this.cartRepository.findOne({
                    where: {
                        id: cartId,
                    },
                    relations: {
                        product: true,
                        user: true,
                    },
                });

                if (cartItem) {
                    cartItem.count = itemCount;
                    await this.cartRepository.save(cartItem);

                    return {
                        statusCode: 200,
                        data: cartItem,
                        message: ['Product does not exist in the cart.'],
                        error: true,
                    };
                } else {
                    return {
                        statusCode: 406,
                        message: ['Product does not exist in the cart.'],
                        error: true,
                    };
                }
            }
        } catch (error) {}
    }
}
