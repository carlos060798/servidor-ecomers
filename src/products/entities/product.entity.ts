import { Column, Entity, PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate, OneToMany, ManyToOne } from 'typeorm';
import { ProductImage } from './product.image.entity';
import { User } from 'src/auth/entities/auth.entity';

@Entity({name: 'products'})
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('float',{
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text',{
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]; 

    // images: ProductImage[];
    @OneToMany(  //  relacion de la tabla priducots  con la tabla  productImage👈
        () => ProductImage,
        (productImage) => productImage.product,
        {
            cascade: true, eager:true 
        }
    )
     images?: ProductImage[]
   
    // relacion de la tabla products con la tabla user
     @ManyToOne(
        ()=>  User,
        (user) => user.product,
        {
            eager: true   // esto es para que traiga los datos de la tabla relacionada
        }
     )
     user: User;

    // procedimiento para crear un slug automatico
     @BeforeInsert()
     checkSlugInsert(){
            if (!this.slug) {
                this.slug = this.title
            }
            this.slug = this.slug.trim().toLowerCase().replaceAll(' ', '-').replaceAll("'", '');
     }

     @BeforeUpdate()
        checkSlugUpdate(){
           
            this.slug = this.slug.trim().toLowerCase().replaceAll(' ', '-').replaceAll("'", '');
        }
}
