import { IsNotEmpty, IsString } from 'class-validator';
import Product from 'src/models/product.model';

export class validateCredentialsResponseType {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: number;
    isAdmin: boolean;
    address: string;
    cart: Product[];
}
