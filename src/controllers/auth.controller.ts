import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import {
    signInRequestType,
    signUpBodyType,
} from 'src/types/requests/auth.request';
import {
    signInResponseType,
    signUpResponseType,
} from 'src/types/responses/auth.response';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    signIn(@Request() req: signInRequestType): Promise<signInResponseType> {
        const user = req.user;

        return this.authService.loginWithCredentials(user);
    }

    @Post('/signup')
    signUp(@Body() body: signUpBodyType): Promise<signUpResponseType> {
        return this.authService.signUp(body);
    }
}
