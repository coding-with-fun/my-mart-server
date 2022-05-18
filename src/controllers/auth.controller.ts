import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { loginWithCredentialsRequestType } from 'src/types/requests/auth.request';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: { user: loginWithCredentialsRequestType }) {
        const user = req.user;

        return this.authService.loginWithCredentials(user);
    }
}
