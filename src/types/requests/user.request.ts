import { IsNotEmpty } from 'class-validator';
import { paginationRequestType } from './pagination.request';

export class getAllUsersQueryType extends paginationRequestType {}

export class userIdRequestType {
    @IsNotEmpty({
        message: 'User ID is required.',
    })
    id: string;
}

export class userRequestType {
    user: userIdRequestType;
}
