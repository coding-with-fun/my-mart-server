import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Brand from 'src/models/brand.model';
import { createBrandBodyType } from 'src/types/requests/brand.request';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
    ) {}

    async createBrand(body: createBrandBodyType) {
        try {
            const newBrand = new Brand();
            newBrand.title = body.title;

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
