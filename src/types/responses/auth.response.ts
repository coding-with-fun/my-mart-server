import Cart from 'src/models/cart.model';
import User from 'src/models/user.model';

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

export class signInResponseType {
    statusCode: number;
    data?: {
        access_token: string;
    };
    message: string[];
    error: boolean;
}

export class signUpResponseType {
    statusCode: number;
    data?: User;
    message: string[];
    error: boolean;
}
