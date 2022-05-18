import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/services/auth.service';
import { validateCredentialsResponseType } from 'src/types/responses/auth.response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(
        email: string,
        password: string,
    ): Promise<validateCredentialsResponseType> {
        const user = await this.authService.validateCredentials({
            email,
            password,
        });

        if (!user) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: [
                        'The credentials does not match our records. Kindly check your credentials.',
                    ],
                    error: true,
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        return user;
    }
}
