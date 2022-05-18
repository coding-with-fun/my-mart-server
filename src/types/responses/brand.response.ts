import Brand from 'src/models/brand.model';

export class createBrandResponseType {
    statusCode: number;
    data: Brand;
    message: string[];
    error: boolean;
}
