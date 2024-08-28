// decorador para obtener el usuario de la petición  personalizado  @GetUser()
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


export const  GetUser = createParamDecorator(
    (data,ctx:ExecutionContext) => {

        const  req = ctx.switchToHttp().getRequest();
        const  user = req.user;

        if(!user){
           throw new InternalServerErrorException('user not found')
        }
        return user; 

    },
) 