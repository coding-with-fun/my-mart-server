import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from 'src/services/brand.service';
import { createBrandBodyType } from 'src/types/requests/brand.request';
import { createBrandResponseType } from 'src/types/responses/brand.response';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post('/add')
    createBrand(
        @Body() body: createBrandBodyType,
    ): Promise<createBrandResponseType> {
        return this.brandService.createBrand(body);
    }

    @Get()
    getCurrentUserDetails() {
        return this.brandService.getCurrentBrandDetails();
    }
}
