import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BrandService } from 'src/services/brand.service';
import {
    createBrandBodyType,
    getAllBrandsQueryType,
    getBrandDetailsBodyType,
} from 'src/types/requests/brand.request';
import { userRequestType } from 'src/types/requests/user.request';
import { createBrandResponseType } from 'src/types/responses/brand.response';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    createBrand(
        @Request()
        req: userRequestType,
        @Body() body: createBrandBodyType,
    ): Promise<createBrandResponseType> {
        const params = {
            title: body.title,
            userId: req.user.id,
        };
        return this.brandService.createBrand(params);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/details')
    getBrandDetails(
        @Request()
        req: userRequestType,
        @Body() body: getBrandDetailsBodyType,
    ) {
        const params = {
            brandId: body.brandId,
            userId: req.user.id,
        };
        return this.brandService.getBrandDetails(params);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/all')
    getAllBrandDetails(@Query() query: getAllBrandsQueryType) {
        return this.brandService.getAllBrandDetails(query);
    }

    @Put('/update')
    updateBrand(@Body() body: createBrandBodyType) {
        return 'Brand updated';
    }

    @Get()
    getCurrentUserDetails() {
        return this.brandService.getCurrentBrandDetails();
    }
}
