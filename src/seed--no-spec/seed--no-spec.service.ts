import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SeedNoSpecService {

  constructor(
    private readonly productsService: ProductsService,
  ) {}

  RunDataProvider() {
    this.insertdataPrueba();
    return "run seed data";
  }
  
  private async insertdataPrueba(){

    await this.productsService.removeAll();

    const Products = initialData.products;
    const insertPromises = [];

    Products.forEach( product => {
    insertPromises.push(this.productsService.create(product))
    }) 

    await Promise.all(insertPromises) 

    return true;
    }



     
  }

