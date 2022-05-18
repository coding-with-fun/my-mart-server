import { IsNotEmpty } from 'class-validator';

export class addProductToCartRequestType {
    @IsNotEmpty({
        message: 'User ID is required.',
    })
    userId: string;

    @IsNotEmpty({
        message: 'Product ID is required.',
    })
    productId: string;
}
