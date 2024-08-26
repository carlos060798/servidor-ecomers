import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CoommeModule } from './coomme/coomme.module';
import { SeedNoSpecModule } from './seed--no-spec/seed--no-spec.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
  ConfigModule.forRoot(), //  configuracion de las variables de entorno
   TypeOrmModule.forRoot({ //  configuracion de la base de datos
    type: 'postgres',
    host:  process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly define the entities: [] array)
    synchronize: true,  //  synchronize the database with the entities every time the application starts
   
  
  }), 
   
   // configuracion de la carpeta publica  para servir  datos estaticos publicos
   ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public' ),
    })
   
   ,ProductsModule, CoommeModule, SeedNoSpecModule, FilesModule, AuthModule ,

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
