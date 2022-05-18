import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import User from 'src/models/user.model';
import {
    createUserBodyType,
    getAllUsersQueryType,
    getUserIdRequestType,
} from 'src/types/requests/user.request';
import { Repository } from 'typeorm';
import { encryptPassword } from './encryptDecryptPassword.service';
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

    async createUser(body: createUserBodyType) {
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
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_ACCEPTABLE,
                        message: [
                            'User with the given email address or contact number already exists.',
                        ],
                        error: true,
                    },
                    HttpStatus.NOT_ACCEPTABLE,
                );
            } else if (error.code === 'ER_WARN_DATA_OUT_OF_RANGE') {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_ACCEPTABLE,
                        message: ['Entry out of range.'],
                        error: true,
                    },
                    HttpStatus.NOT_ACCEPTABLE,
                );
            } else {
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

            delete userDetails.password;

            return {
                statusCode: 200,
                data: userDetails,
                message: ['User details fetched.'],
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
