import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
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

    @BeforeInsert()
    cherckFieldsBeforeInsert(){
    this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    cherckFieldsBeforeUpdate(){
        this.cherckFieldsBeforeInsert();
    }
    

}
