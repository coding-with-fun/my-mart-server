import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/models/user.model';
import {
    loginWithCredentialsRequestType,
    validateCredentialsRequestType,
} from 'src/types/requests/auth.request';
import { Repository } from 'typeorm';
import { matchPassword } from './encryptDecryptPassword.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private jwtTokenService: JwtService,
    ) {}

    async validateCredentials(params: validateCredentialsRequestType) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: params.email,
                },
                select: ['id', 'email', 'password'],
            });
            const doesPasswordMatch = await matchPassword(
                params.password,
                user.password,
            );

            if (user && doesPasswordMatch) {
                const { password, ...result } = user;
                return result;
            }

            return null;
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: ['Internal server error.'],
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async loginWithCredentials(user: loginWithCredentialsRequestType) {
        try {
            const payload = {
                id: user.id,
            };

            return {
                statusCode: 200,
                data: {
                    access_token: this.jwtTokenService.sign(payload),
                },
                message: ['User logged in successfully.'],
                error: false,
            };
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: ['Internal server error.'],
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
