import { IsNotEmpty, IsString } from 'class-validator';

export class validateCredentialsRequestType {
    @IsNotEmpty({
        message: 'Email address is required.',
    })
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
}

export class loginWithCredentialsRequestType {
    @IsNotEmpty({
        message: 'Email address is required.',
    })
    @IsString({
        message: 'Email address must be a string.',
    })
    email: string;

    @IsNotEmpty({
        message: 'User ID is required.',
    })
    @IsString({
        message: 'User ID must be a string.',
    })
    id: string;
}
