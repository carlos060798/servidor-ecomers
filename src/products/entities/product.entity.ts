import { Column, Entity, PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate, OneToMany, ManyToOne } from 'typeorm';
import { ProductImage } from './product.image.entity';
import { User } from 'src/auth/entities/auth.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@Entity({name: 'products'})
export class Product { 

    @ApiProperty(
        {
            example: ' 1d6c7b6d-1b1b-4b6d-8c1b-1b1b6d8c1b1b',
            description: 'identificador unico del producto',
            format: 'uuid',
            uniqueItems: true
        }
    )

    @PrimaryGeneratedColumn('uuid')
    id: string;
     
    @ApiProperty(
        {
            example: 'camisa de hombre',
            description: 'nombre del producto',
            uniqueItems: true
        }
    )
    @Column('text', {
        unique: true,
    })
    title: string;
    
    @ApiProperty(
        {
            example: 100,
            description: 'precio del producto',
            type: 'number'
        }
    )
    @Column('float',{
        default: 0
    })
    price: number;

    @ApiProperty(
        {
            example: 'camisa de hombre',
            description: 'descripcion del producto',
            type: 'string'
        }
    )
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty(
        {
            example: 'camisa-de-hombre',
            description: 'slug del producto',
            type: 'string'
        }
    )

    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty(
        {
            example: 100,
            description: 'stock del producto',
            type: 'number'
        }
    )

    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty(
        {
            example: ['s','m','l','xl'],
            description: 'tallas del producto',
            type: 'array'
        }
    )

    @Column('text',{
        array: true
    })
    sizes: string[];

    @ApiProperty(
        {
            example: 'hombre',
            description: 'genero del producto',
            type: 'string'
        }
    )

    @Column('text')
    gender: string;

    @ApiProperty(  //  decorador para la documentacion de la api
        {
            example: ['deportes','moda'],
            description: 'tags del producto',
            type: 'array'
        }
    )

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]; 
    
    // relacion de la tabla products con la tabla productImage
    @ApiProperty(
        {
            example: 'imagen del producto',
            description: 'imagenes del producto',
            type: 'array'
        }
    )
    // images: ProductImage[];
    @OneToMany(  //  relacion de la tabla priducots  con la tabla  productImage👈
        () => ProductImage,
        (productImage) => productImage.product,
        {
            cascade: true, eager:true 
        }
    )

     
     images?: ProductImage[] 

     @ApiProperty(
        {
            example: '1d6c7b6d-1b1b-4b6d-8c1b-1b1b6d8c1b1b',


            format: 'uuid',
            
            description: 'imagen principal del producto',
            type: 'string'
        }
     )
   
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
