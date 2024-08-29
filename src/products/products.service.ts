import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Delete, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginationDto } from 'src/coomme/dto/pagination-dto';
import { validate as IsUuid } from 'uuid'
import { ProductImage } from './entities/product.image.entity';
import { DataSource } from 'typeorm'; 
import { User } from 'src/auth/entities/auth.entity';
@Injectable()
export class ProductsService {



  private readonly logger = new Logger(
    'ProductsService'
  )  //  esto es para hacer un log de los errores

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private imageProductRepository: Repository<ProductImage>, 

    private readonly  dataSource: DataSource  //  esta  propiedad  es para  hacer  querys  directas  a la base de datos
  ) { }
  async create(createProductDto: CreateProductDto,user: User) {
    const { images = [], ...productDetails } = createProductDto;

    try {
      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.imageProductRepository.create({ url: image })), // esto es para crear un array de imagenes en la base de datos
        user: user
      });
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleError(error);

    }

  }

  async findAll(pagination: paginationDto) {
    try {
      const { limit = 10, offset = 0 } = pagination
      const products = await this.productRepository.find({
        skip: offset,
        take: limit,
        relations: { //  esta  proiedad  es para  traer datos  de las relaciones de la tabla          
          images:true
        }
      })
      // aplanar el array de  productos
      console.log(products)
      return products.map(product => ({
        ...product,
        images: product.images.map(img => img.url)
      }))

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
        const queryBuilder = this.productRepository.createQueryBuilder('prod');   //  se usa el ´prod para  hacer referencia a la tabla de productos
        product = await queryBuilder
          .where('UPPER(title) =:title or slug =:slug', {
            title: term.toUpperCase(),
            slug: term.toLowerCase(),
          })
          .leftJoinAndSelect('prod.images', 'images') //  esta  proiedad  es para  traer datos  de las relaciones de la tabla
          .getOne();
      }


      if (!product)
        throw new NotFoundException(`Product with ${term} not found`);

      return product;
    } catch (error) {
      console.log(error);
      this.handleError(error);

    }
  }

  async   findonePlanned(term: string){
    const { images = [], ...rest} = await this.findOne(term); 
    return {
      ...rest,
      images: images.map(image=> image.url)
    }
  }
  async update(id: string, updateProductDto: UpdateProductDto,user: User) {

     const { images , ...productupdate } = updateProductDto;
     const product = await this.productRepository.preload({
      id,
      ...productupdate
    })
    if (!product) throw new NotFoundException('Producto no encontrado');

    // si  hay imagenes  se  actualizan queryruner  para  actualizar  las imagenes  

      const queryRunner = this.dataSource.createQueryRunner(); 
      await queryRunner.connect(); // se  conecta  a la base de datos
      await queryRunner.startTransaction() // se  inicia  la transaccion

    
      
    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });  //  se  eliminan  las imagenes  del producto
        product.images = images.map(image => this.imageProductRepository.create({ url: image }));  //  se  crean  las  nuevas  imagenes

      } else{
        product.images =  await  this.imageProductRepository.findBy({product: {id}}); //  se  traen  las imagenes  del producto
      }
      product.user = user; 
      await queryRunner.manager.save(product); // se  guardan  los cambios
      await queryRunner.commitTransaction(); // se  confirma  la transaccion
      await queryRunner.release(); // se  libera  la transaccion
      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // se  hace un rollback  de la transaccion
      await queryRunner.release(); // se  libera  la transaccion
      console.log(error);
      this.handleError(error);
    }





  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id) 
      // eliminacion en cascada product.images

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

  // metodo para eliminar  todos los productos de la base de datos

  async removeAll(){
    const query = this. productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleError(error);
    }
  }
}
