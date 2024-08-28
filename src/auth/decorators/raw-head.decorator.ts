


// decorador para obtener el usuario de la petición  personalizado  @GetUser()
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


export const   RawHeaders = createParamDecorator(
    (data:string,ctx:ExecutionContext) => {

        const  req = ctx.switchToHttp().getRequest();
        
        return  req.rawHeaders;

    },
) 