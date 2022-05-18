import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product.model';

@Entity()
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

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
