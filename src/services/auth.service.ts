import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/models/user.model';
import {
    signInUserRequestType,
    signUpBodyType,
    validateCredentialsRequestType,
} from 'src/types/requests/auth.request';
import {
    signInResponseType,
    signUpResponseType,
} from 'src/types/responses/auth.response';
import { Repository } from 'typeorm';
import {
    encryptPassword,
    matchPassword,
} from './encryptDecryptPassword.service';

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

            if (user) {
                const doesPasswordMatch = await matchPassword(
                    params.password,
                    user.password,
                );

                if (doesPasswordMatch) {
                    const { password, ...result } = user;
                    return result;
                }
            }

            return null;
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: 500,
                    message: ['Internal server error.'],
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async loginWithCredentials(
        user: signInUserRequestType,
    ): Promise<signInResponseType> {
        try {
            const payload = {
                id: user.id,
            };

            return {
                statusCode: 200,
                data: {
                    access_token: this.jwtTokenService.sign(payload),
                },
                message: ['User signed in successfully.'],
                error: false,
            };
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: 500,
                    message: ['Internal server error.'],
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async signUp(body: signUpBodyType): Promise<signUpResponseType> {
        try {
            const newUser = new User();
            newUser.firstName = body.firstName;
            newUser.lastName = body.lastName;
            newUser.email = body.email;
            newUser.password = await encryptPassword(body.password);
            newUser.contactNumber = body.contactNumber;
            newUser.address = body.address;
            newUser.isAdmin = false;
            newUser.cart = [];

            await this.userRepository.save(newUser);
            delete newUser.password;

            return {
                statusCode: 200,
                data: newUser,
                message: ['New user created.'],
                error: false,
            };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return {
                    statusCode: 406,
                    message: [
                        'User with the given email address or contact number already exists.',
                    ],
                    error: true,
                };
            } else if (error.code === 'ER_WARN_DATA_OUT_OF_RANGE') {
                return {
                    statusCode: 406,
                    message: ['Entry out of range.'],
                    error: true,
                };
            } else {
                throw new HttpException(
                    {
                        statusCode: 500,
                        message: ['Internal server error.'],
                        error: true,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
}
