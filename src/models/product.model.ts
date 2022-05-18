import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Brand from './brand.model';

@Entity()
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

    @Column({
        name: 'price',
        type: 'integer',
        select: false,
    })
    count: number;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;
}
