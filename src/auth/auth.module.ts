import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from '../products/entities/product.image.entity';
import { User } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';  


@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product,ProductImage,User]),
       PassportModule.register({ defaultStrategy: 'jwt' }), // esto es para que passport use jwt
    JwtModule.registerAsync({  // esto es para que jwt use el secret key

      imports: [
        ConfigModule  //  configuracion de las variables de entorno
      ],
      inject: [
          
          ConfigService  // configuracion de las variables de entorno
      ],

      useFactory: (configService:ConfigService) => {  // esto es para que jwt use el secret key
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h' },
        };
        
      },
    }), // esto es para que jwt use el secret key

  ],
  exports: [AuthService,
    TypeOrmModule,
    JwtModule,
    PassportModule,
    JwtStrategy
    
  ],
})
export class AuthModule {}
