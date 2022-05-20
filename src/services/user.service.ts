import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import User from 'src/models/user.model';
import {
    getAllUsersQueryType,
    getUserIdRequestType,
} from 'src/types/requests/user.request';
import { Repository } from 'typeorm';
import { pagination } from './pagination.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllUsers(query: getAllUsersQueryType) {
        try {
            const page = _.get(query, 'page', 1);
            const limit = _.get(query, 'limit', 10);
            const orderField = _.get(query, 'orderField', 'id');
            const orderBy = _.get(query, 'orderBy', 'ASC');

            const [allUsers, count] = await this.userRepository.findAndCount({
                take: limit,
                skip: (page - 1) * limit,
                order: {
                    [orderField]: orderBy,
                },
                relations: {
                    cart: true,
                },
            });

            return {
                statusCode: 200,
                data: pagination(allUsers, count, page, limit),
                message: ['All users fetched.'],
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

    async getUserDetailsById(params: getUserIdRequestType) {
        try {
            const userId = parseInt(params.id);

            const userDetails = await this.userRepository.findOne({
                where: {
                    id: userId,
                },
                relations: {
                    cart: true,
                },
            });

            if (userDetails) {
                delete userDetails.password;

                return {
                    statusCode: 200,
                    data: userDetails,
                    message: ['User details fetched.'],
                    error: false,
                };
            } else {
                return {
                    statusCode: 406,
                    message: ['User not found.'],
                    error: true,
                };
            }
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
