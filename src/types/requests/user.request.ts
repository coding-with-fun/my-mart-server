import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
} from 'class-validator';
import { paginationRequestType } from './pagination.request';

export class getAllUsersQueryType extends paginationRequestType {}

export class createUserBodyType {
    @IsNotEmpty({
        message: 'First name is required.',
    })
    @IsString({
        message: 'First name must be a string.',
    })
    @Length(1, 20, {
        message: 'First name must be 20 characters long.',
    })
    firstName: string;

    @IsNotEmpty({
        message: 'Last name is required.',
    })
    @IsString({
        message: 'Last name must be a string.',
    })
    @Length(1, 20, {
        message: 'Last name must be 20 characters long.',
    })
    lastName: string;

    @IsNotEmpty({
        message: 'Email address is required.',
    })
    @IsEmail(
        {},
        {
            message: 'Please enter valid email address.',
        },
    )
    @IsString({
        message: 'Email address must be a string.',
    })
    email: string;

    @IsNotEmpty({
        message: 'Password is required.',
    })
    @IsString({
        message: 'Password must be a string.',
    })
    password: string;

    @IsNotEmpty({
        message: 'Contact number is required.',
    })
    @IsNumber(
        {},
        {
            message: 'Contact number must be a number.',
        },
    )
    contactNumber: number;

    @IsNotEmpty({
        message: 'Address is required.',
    })
    @IsString({
        message: 'Address must be a string.',
    })
    @Length(1, 100, {
        message: 'Address must be at most 100 characters long.',
    })
    address: string;
}

export class getUserIdRequestType {
    @IsNotEmpty({
        message: 'User ID is required.',
    })
    id: string;
}
