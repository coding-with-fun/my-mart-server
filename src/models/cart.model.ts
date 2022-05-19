import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './product.model';
import User from './user.model';

@Entity('cart')
export default class Cart {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'int',
    })
    id: number;

    @ManyToOne(() => User, (user) => user.cart)
    user: User;

    @OneToOne(() => Product, (product) => product.id)
    @JoinColumn()
    product: Product;

    @Column({
        name: 'count',
        type: 'int',
    })
    count: number;
}
