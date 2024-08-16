import { Injectable, BadRequestException } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class FilesService { 

    getStaticImages(imageName: string) {  // funcion para obtener la imagen de la carpeta static
        const path = join(__dirname, '..', '..', 'static', 'products',
            imageName);
        
        if (!existsSync(path)){
            throw  new BadRequestException('No se ha encontrado la imagen');
        }

        return path;
    }

}
