import { IsNotEmpty, IsString, Length } from 'class-validator';

export class createBrandBodyType {
    @IsNotEmpty({
        message: 'Brand title is required.',
    })
    @IsString({
        message: 'Brand title must be a string.',
    })
    @Length(1, 50, {
        message: 'Brand title must be 50 characters long.',
    })
    title: string;
}
