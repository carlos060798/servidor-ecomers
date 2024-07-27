import { Controller, Get, Post, Body, Patch, Param, Delete,Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { paginationDto } from 'src/coomme/dto/pagination-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
   async create(@Body() createProductDto: CreateProductDto) {

    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() pagination:paginationDto) {
    return this.productsService.findAll(pagination);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    console.log(term);
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id:string , @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
