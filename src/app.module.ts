import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';


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
   }), ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
