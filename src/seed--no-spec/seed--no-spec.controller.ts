import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedNoSpecService } from './seed--no-spec.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRole } from 'src/auth/interface/valid-role';


@Controller('seed')
export class SeedNoSpecController {
  constructor(private readonly seedNoSpecService: SeedNoSpecService) {}

 @Get()
 @Auth(ValidRole.admin)
 executeDataProvider() {
    return this.seedNoSpecService.RunDataProvider();
 }

 
}
