import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from 'src/services/user.service';
import {
    createUserBodyType,
    getAllUsersQueryType,
    getUserDetailsByIdRequestType,
} from 'src/types/requests/user.request';
import {
    createUserResponseType,
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
        req: {
            user: getUserDetailsByIdRequestType;
        },
    ): Promise<getUserDetailsByIdResponseType> {
        return this.userService.getUserDetailsById(req.user);
    }

    @Get('/all')
    getAllUsers(
        @Query() query: getAllUsersQueryType,
    ): Promise<getAllUsersResponseType> {
        return this.userService.getAllUsers(query);
    }

    @Post('/add')
    createUser(
        @Body() body: createUserBodyType,
    ): Promise<createUserResponseType> {
        return this.userService.createUser(body);
    }
}
