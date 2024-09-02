import { Controller, Get, Post, Body, Patch, Param, Delete,Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/auth.entity';
import { RawHeaders } from './decorators/raw-head.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRole } from './interface/valid-role';
import { RoleProtected } from './decorators/role-protected.decorator';
import { Auth } from './decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) { 
    

    return this.authService.create(createAuthDto);
  }



  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto)
  }

  @Get('check-auth-status') // ruta para verificar si el usuario esta autenticado
  @Auth()
  checkAuthStatus(
    @GetUser() user: User ,

  ){
   return this.authService.checkAuthStatus(user)
  }
  
@Get('private')  // ruta privada
@UseGuards(AuthGuard()) // protegemos la ruta con el guard
testingPrivateRoute(
  @GetUser() user: User ,
  @GetUser() userEmail: string,
  @RawHeaders() rawHeaders: string[] 


){


  return {
    ok: true,
    user,
    userEmail,
    rawHeaders
  }
}

@Get('private2')
@RoleProtected(ValidRole.admin,ValidRole.superUser) // protegemos la ruta con el guard y le pasamos los roles validos
@UseGuards(AuthGuard(),UserRoleGuard)
testingPrivateRoute2(
  @GetUser() user: User
){
  return {
    ok: true,
    user: user
  }

} 


@Get('private3')
@Auth(ValidRole.admin)
privateRoute3(
  @GetUser() user: User
){
  return {
    ok: true,
    user
  }
}
}