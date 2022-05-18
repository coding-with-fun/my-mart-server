import User from 'src/models/user.model';

export class getAllUsersResponseType {
    statusCode: number;
    data: {
        items: User[];
        meta: {
            totalItems: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    };
    message: string[];
    error: boolean;
}

export class createUserResponseType {
    statusCode: number;
    data: User;
    message: string[];
    error: boolean;
}

export class getUserDetailsByIdResponseType {
    statusCode: number;
    data: User;
    message: string[];
    error: boolean;
}
