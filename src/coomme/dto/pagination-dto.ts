import { IsOptional, IsPositive,Min} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class paginationDto{
    @ApiProperty({
        description: 'Cantidad de elementos por pagina',
        default: 10
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        description: 'Pagina actual',
        default: 0
    })

    @IsOptional()
    @Min(0)
    @Type(() => Number)

    offset?: number;
}