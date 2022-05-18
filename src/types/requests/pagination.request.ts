import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class paginationRequestType {
    @IsOptional()
    @IsNumber(
        {},
        {
            message: 'Limit must be a number.',
        },
    )
    limit: number;

    @IsOptional()
    @IsNumber(
        {},
        {
            message: 'Page number must be a number.',
        },
    )
    page: number;

    @IsOptional()
    @IsIn(['ASC', 'DESC'], {
        message: 'Order by must be ASC or DESC.',
    })
    orderBy: string;

    @IsOptional()
    orderField: string;
}
