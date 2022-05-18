import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { paginationRequestType } from './pagination.request';

export class getAllProductsQueryType extends paginationRequestType {}

export class createProductBodyType {
    @IsNotEmpty({
        message: 'Product title is required.',
    })
    @IsString({
        message: 'Product title must be a string.',
    })
    @Length(1, 50, {
        message: 'Product title must be 50 characters long.',
    })
    title: string;

    @IsNotEmpty({
        message: 'Product price is required.',
    })
    @IsNumber(
        {},
        {
            message: 'Product price must be a number.',
        },
    )
    price: number;

    @IsNotEmpty({
        message: 'Product brand is required.',
    })
    @IsString({
        message: 'Product brand must be a string.',
    })
    brand: string;
}
