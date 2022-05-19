import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Brand from './brand.model';

@Entity('product')
export default class Product {
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

    @Column({
        name: 'price',
        type: 'float',
    })
    price: number;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;
}
