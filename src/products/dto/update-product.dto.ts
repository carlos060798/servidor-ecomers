import { PartialType } from '@nestjs/swagger';  // esto extiende la clase de un DTO
import { CreateProductDto } from './create-product.dto';


export class UpdateProductDto extends PartialType(CreateProductDto) {
    
}
