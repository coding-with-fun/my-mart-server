import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './product.model';
import User from './user.model';

@Entity('brand')
export default class Brand {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer',
        name: 'id',
    })
    id: number;

    @Column({
        name: 'title',
        type: 'varchar',
        length: 50,
    })
    title: string;

    @OneToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    createdBy: User;

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
