import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ){}
 async  create(createProductDto: CreateProductDto) {
    
   try{
    console.log(createProductDto)
  
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;

   } catch (error) {
     console.log(error);
     throw new InternalServerErrorException({
        message: 'Error while creating product',
        error
     });


   }

  }

  findAll() {
    try{
      return this.productRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
         message: 'Error while fetching products',
         error
      });

  }}

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
