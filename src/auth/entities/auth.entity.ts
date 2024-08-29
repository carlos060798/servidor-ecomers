import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, OneToMany} from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid") 
    id : string;
    @Column('text')
    fullname : string;
    @Column('text',{
        select : false  // esto es para que no se muestre en la respuesta
    })
    password : string;
    @Column('text',{
        unique : true
    })
    email : string;
    @Column('bool',{
        default : true
    })
     isActive : boolean;

    @Column('text',{
        array : true,
         default : ['user']
    })
    role : string[]; 

    // relacion de la tabla user con la tabla product
    @OneToMany(
        ()=> Product,
        (product) => product.user,
       
    )
    product: Product;

    @BeforeInsert()
    cherckFieldsBeforeInsert(){
    this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    cherckFieldsBeforeUpdate(){
        this.cherckFieldsBeforeInsert();
    }
    

}
