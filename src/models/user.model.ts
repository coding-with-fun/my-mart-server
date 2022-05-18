import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './product.model';

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'int',
    })
    id: number;

    @Column({
        name: 'firstName',
        type: 'varchar',
        length: 20,
    })
    firstName: string;

    @Column({
        name: 'lastName',
        type: 'varchar',
        length: 20,
    })
    lastName: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 50,
        unique: true,
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 20,
        select: false,
    })
    password: string;

    @Column({
        name: 'contactNumber',
        type: 'int',
        unique: true,
    })
    contactNumber: number;

    @Column({
        name: 'isAdmin',
        type: 'tinyint',
        default: false,
    })
    isAdmin: boolean;

    @Column({
        name: 'address',
        type: 'varchar',
        length: 100,
    })
    address: string;

    @ManyToMany(() => Product)
    @JoinTable()
    cart: Product[];
}
