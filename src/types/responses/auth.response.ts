import Cart from 'src/models/cart.model';

export class validateCredentialsResponseType {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: number;
    isAdmin: boolean;
    address: string;
    cart: Cart[];
}
