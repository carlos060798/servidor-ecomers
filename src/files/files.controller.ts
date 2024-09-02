import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors ,Res} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { fileName } from './helpers/fileName';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';




@ApiTags('files')
@ApiResponse({status: 400, description: 'Bad Request'})
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService ,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imagesname')
  getFileImage(
    @Res()  res: Response,  // se puede usar el decorador @Res para obtener la respuesta personalizado de la solicitud 
    @Param('imagesname') imagesname: string) {

    const path = this.filesService.getStaticImages(imagesname); 


    res.sendFile(path);
  
    return  path;
  }
  // controlador para cargar imagenes

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{ // se puede configurar el interceptor con un objeto para limitar propiedades
    fileFilter: fileFilter, 
    storage: diskStorage({
      destination: './static/products', // carpeta donde se guardara el archivo
      filename: fileName // funcion para generar el nombre del archivo
    })
  }))
  uploadFileImage(
  
    @UploadedFile() file:Express.Multer.File)  {

      if (!file) {
       throw new BadRequestException('No se ha enviado ningun archivo');
        
      } 

      const secureUrl =  `${this.configService.get('HOST_API')}/files/product/${file.filename}`; // se obtiene la url de la imagen
    return {
      secureUrl
    }
  }
}
