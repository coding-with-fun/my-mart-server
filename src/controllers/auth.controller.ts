import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { loginWithCredentialsRequestType } from 'src/types/requests/auth.request';
import { createUserBodyType } from 'src/types/requests/user.request';
import { createUserResponseType } from 'src/types/responses/user.response';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    async login(@Request() req: { user: loginWithCredentialsRequestType }) {
        const user = req.user;

        return this.authService.loginWithCredentials(user);
    }

    @Post('/signup')
    createUser(
        @Body() body: createUserBodyType,
    ): Promise<createUserResponseType> {
        return this.authService.signUp(body);
    }
}
