import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { paginationDto } from 'src/coomme/dto/pagination-dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRole } from 'src/auth/interface/valid-role';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
@ApiTags('products')
@ApiResponse({ status: 201, description: 'Producto creado', 
  type: Product
})
@ApiResponse({ status: 400, description: 'Bad Request' 
})
@ApiResponse({ status: 401, description: 'No autorizado' 
})
@ApiResponse({ status: 403, description: 'Token invalido' 
})
@ApiResponse({ status: 404, description: 'No encontrado' 
})
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth() //  decorador para validar que el usuario tenga el rol de adming
  async create(@Body() createProductDto: CreateProductDto,
    @GetUser() user: User
  ) {

    return this.productsService.create(createProductDto,user);
  }

  @Get()
  findAll(@Query() pagination: paginationDto) {
    return this.productsService.findAll(pagination);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    console.log(term);
    return this.productsService.findonePlanned(term);
  }

  @Patch(':id')
  @Auth(ValidRole.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto ,
  @GetUser() user: User
) {
    return this.productsService.update(id, updateProductDto,user);
  }

  @Delete(':id')
  @Auth(ValidRole.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
