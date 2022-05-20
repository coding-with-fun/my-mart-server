import { IsNotEmpty } from 'class-validator';
import { paginationRequestType } from './pagination.request';

export class getAllUsersQueryType extends paginationRequestType {}

export class getUserIdRequestType {
    @IsNotEmpty({
        message: 'User ID is required.',
    })
    id: string;
}
