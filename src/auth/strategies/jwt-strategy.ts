import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { User } from "../entities/auth.entity";
import { jwtPayload } from "../interface/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException} from "@nestjs/common";

//  MIDDLEWARE DE AUTENTICACION JWT
@Injectable()
export class  JwtStrategy extends PassportStrategy(Strategy) { 

   constructor(
    @InjectRepository(User) // inyectamos el repositorio de usuario
    private readonly userRepository: Repository<User>,  // inyectamos el repositorio de usuario

    configService: ConfigService // inyectamos el servicio de configuracion

   ){

    super({   
        secretOrKey: configService.get('JWT_SECRET'), // obtenemos el secret key
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // obtenemos el token del header
    })
   }
    async validate(payload: jwtPayload ): Promise<User> {  // validamos el token
        const { email } = payload;   // obtenemos el email del token
        
        const user = await  this.userRepository.findOneBy({  email });  // buscamos el usuario por email

        if(!user)   // si no existe el usuario
            throw new UnauthorizedException(
                'usuario no encontrado'
            );
       if(!user.isActive)   // si no esta activo
            throw new UnauthorizedException(
                'usuario no activo'
            );
        

        return user  // retornamos el usuario
    }
  

}