import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { ValidRole } from '../interface/valid-role';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { applyDecorators, UseGuards } from '@nestjs/common';

//  funcion para aplicar varios decoradores a un solo metodo y agruparlo en uno solo
export function   Auth(...roles:ValidRole[])

{

  return applyDecorators(  //  function para aplicar varios decoradores a un solo metodo
    RoleProtected(...roles), //  aplicamos el decorador RoleProtected
    UseGuards(AuthGuard(),UserRoleGuard), //  aplicamos el decorador UseGuards
  )
}

