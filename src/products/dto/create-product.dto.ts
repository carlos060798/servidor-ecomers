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

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number; 

    @IsString({ each: true })
    @IsArray()
    sizes: string[]

    @IsIn(['men','women','kid','unisex'])
    gender: string; 

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[] 

    @IsString({ each: true }) //  esto valida el arrat de objetos
    @IsArray()
    @IsOptional()
    images?: string[]
}
