import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/models/user.model';
import { validateCredentialsRequestType } from 'src/types/requests/auth.request';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private jwtTokenService: JwtService,
    ) {}

    async validateCredentials(params: validateCredentialsRequestType) {
        const user = await this.userRepository.findOne({
            where: {
                email: params.email,
            },
        });

        if (user && params.password === user.password) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async loginWithCredentials(user: any) {
        const payload = {
            id: user.id,
        };

        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}
