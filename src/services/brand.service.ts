import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Brand from 'src/models/brand.model';
import User from 'src/models/user.model';
import { createBrandParamType } from 'src/types/requests/brand.request';
import { createBrandResponseType } from 'src/types/responses/brand.response';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createBrand(
        params: createBrandParamType,
    ): Promise<createBrandResponseType> {
        try {
            const userId = parseInt(params.userId);

            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                },
            });

            const newBrand = new Brand();
            newBrand.title = params.title;
            newBrand.createdBy = user;

            await this.brandRepository.save(newBrand);
            return {
                statusCode: 200,
                data: newBrand,
                message: ['New brand created.'],
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

    async getCurrentBrandDetails() {
        return 'Brand details fetched.';
    }
}
