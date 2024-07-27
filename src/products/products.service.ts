import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginationDto } from 'src/coomme/dto/pagination-dto';
import { validate as IsUuid } from 'uuid'
@Injectable()
export class ProductsService {



  private readonly logger = new Logger(
    'ProductsService'
  )  //  esto es para hacer un log de los errores

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {

    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleError(error);

    }

  }

  findAll(pagination: paginationDto) {
    try {
      const { limit = 10, offset = 0 } = pagination
      return this.productRepository.find({
        skip: offset,
        take: limit
      })
    } catch (error) {
      console.log(error);
      this.handleError(error);        

    }
  }

  async findOne(term: string) {

    

    let product: Product;
    try {
      console.log(term);
      if (IsUuid(term)) {
        product = await this.productRepository.findOneBy({ id: term });
      } else {
        const queryBuilder = this.productRepository.createQueryBuilder();
        product = await queryBuilder
          .where('UPPER(title) =:title or slug =:slug', {
            title: term.toUpperCase(),
            slug: term.toLowerCase(),
          }).getOne();
      }


      if (!product)
        throw new NotFoundException(`Product with ${term} not found`);

      return product;
    } catch (error) {
      console.log(error);
      this.handleError(error);

    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {



    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto
      })
      if (!product) throw new NotFoundException('Producto no encontrado');

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }





  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id)

      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      await this.productRepository.remove(product);
      return 'Producto eliminado';
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    } else {
      this.logger.error(error.message);
      throw new InternalServerErrorException("revisa el log para mas detalles");
    }
  }
}
