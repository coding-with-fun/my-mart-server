import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BrandService } from 'src/services/brand.service';
import { createBrandBodyType } from 'src/types/requests/brand.request';
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

    @Put('/update')
    updateBrand(@Body() body: createBrandBodyType) {
        return 'Brand updated';
    }

    @Get()
    getCurrentUserDetails() {
        return this.brandService.getCurrentBrandDetails();
    }
}
