import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import  { Logger } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-dto';
import {jwtPayload} from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

  private readonly logger = new Logger(
    'AuthService'
  )  //  esto es para hacer un log de los errores

  constructor(
    @InjectRepository(User)
    private readonly  userRepository: Repository<User>,

    private  readonly jwtService: JwtService
  ) {}
  async create(createAuthDto: CreateUserDto ) {

    const { password , ...userDate} = createAuthDto

    const  user = await this.userRepository.create({
      ...userDate,
      password: await bcrypt.hash(password, 10)
    })
   try{
    await this.userRepository.save(user)
  
    return  {
      ...user,
      token : this.getJwtToken({email: user.email})
    }
   }catch(error){
     this.handleError(error)
   }
  }

 
 
 async login(loginUserDto:   LoginUserDto){
    const {email, password} = loginUserDto
    try{ 
      const user = await this.userRepository.findOne({
        where : {email},
        select : ['email', 'password']
      })  // findOneBy es un metodo que no existe en typeorm
      if(!user){
        throw new UnauthorizedException('invalid credentials')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if(!isValidPassword){
        throw new BadRequestException('invalid credentials')
      }
      return {
        ...user,
        token : this.getJwtToken({email: user.email}) 
      }


    } catch(error){
      this.handleError(error)
    }
    
 }

 private  getJwtToken(payload:jwtPayload){

  const token = this.jwtService.sign(payload) 

  return token

 }
 

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException('user already exists')
    } else {
      this.logger.error(error.message, error.stack)
      throw new InternalServerErrorException()
    }
  }
}


