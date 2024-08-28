import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { BadRequestException } from '@nestjs/common';
import { META__ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector // inyectamos el reflector para poder acceder a los metadatos
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META__ROLES, context.getHandler()); // obtenemos los roles validos de la ruta

    const req = context.switchToHttp().getRequest(); // obtenemos la peticion
    const user = req.user as User; // obtenemos el usuario de la peticion 
    console.log(user);

    if (!validRoles) return true; // si no hay roles validos retornamos true
    if(validRoles.length === 0) return true; // si no hay roles validos retornamos true
    if (!user)
      throw new BadRequestException(' User not found');


    for (const role of user.role) { // recorremos los roles validos
      if (validRoles.includes(role)) { // si el usuario tiene un rol valido
        return true; // retornamos true
      }
    }

    throw new ForbiddenException( `User with role ${user.fullname} is not allowed to access this route need this roles ${validRoles}`)


  }
}