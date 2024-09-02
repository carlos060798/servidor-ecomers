import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
  IsInt,
  IsIn
} from "class-validator";

export class CreateProductDto {

  @ApiProperty(
    {
      description: 'Nombre del producto',
      example: 'Camiseta'
    }
  )

    @IsString()
    @MinLength(1)
    title: string; 


    @ApiProperty(
      {
        description: 'Precio del producto',
        example: 100
      }
    )

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
 
    @ApiProperty(
      {
        description: 'Descripción del producto',
        example: 'Camiseta de algodón'
      })
    @IsString()
    @IsOptional()
    description?: string; 


    @ApiProperty(
      {
        description: 'Slug del producto',
        example: 'camiseta'
      }
    )


    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty(
      {
        description: 'Cantidad de stock del producto',
        example: 100
      }
    )

    @IsInt()
    @IsPositive()
    @IsOptional() 
    stock?: number; 

    @ApiProperty(
      {
        description: 'Categoría del producto',
        example: '[X, Y, Z]'
      }
    )

    @IsString({ each: true })
    @IsArray()
    sizes: string[] 

    @ApiProperty(
      {
        description: 'Género del producto',
        example: '[mens,kids]'})

    @IsIn(['men','women','kid','unisex'])
    gender: string; 

    @ApiProperty(
      {
        description: 'Tags del producto',
        example: '[tag1, tag2, tag3]'
      }
    )
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[] 

    @ApiProperty(
      {
        description: 'Imágenes del producto',
        example: '[url1, url2, url3]'
      }
    )

    @IsString({ each: true }) //  esto valida el arrat de objetos
    @IsArray()
    @IsOptional()
    images?: string[]
}
