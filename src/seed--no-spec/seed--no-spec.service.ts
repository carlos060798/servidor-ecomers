import { Injectable, Query } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { Product } from '../products/entities/product.entity';import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
9

@Injectable()
export class SeedNoSpecService {

  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(Product)
    private userRepository: Repository<User>
  ) {}

  async RunDataProvider() {
     await this.deleteAllData();
     const adminuser = await this.insertdataUsers();
     await this.insertdataPrueba(adminuser);
    return "run seed data";
  }
  private async deleteAllData() {

    await this.productsService.removeAll();

    const queryBuilder = this.userRepository.createQueryBuilder(

    );
    await queryBuilder.delete().where({}).execute();
    
    

  } 

  private async insertdataUsers() {
    const Seedusers = initialData.users;
    const users: User [] =[];

    Seedusers.forEach( user => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers= await this.userRepository.save(Seedusers);

    return dbUsers[0];
  }
    
private async insertdataPrueba(user: User){

    await this.productsService.removeAll();

    const Products = initialData.products;
    const insertPromises = [];
    console.log(Products);
    Products.forEach( product => {
    insertPromises.push(this.productsService.create(product,user))
    }) 

   
    await Promise.all(insertPromises) 

    return true;
    }



     
  }

