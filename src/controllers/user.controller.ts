import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from 'src/services/user.service';
import {
    getAllUsersQueryType,
    userRequestType,
} from 'src/types/requests/user.request';
import {
    getAllUsersResponseType,
    getUserDetailsByIdResponseType,
} from 'src/types/responses/user.response';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/details')
    getUserInfo(
        @Request()
        req: userRequestType,
    ): Promise<getUserDetailsByIdResponseType> {
        return this.userService.getUserDetailsById(req.user);
    }

    @Get('/all')
    getAllUsers(
        @Query() query: getAllUsersQueryType,
    ): Promise<getAllUsersResponseType> {
        return this.userService.getAllUsers(query);
    }
}
