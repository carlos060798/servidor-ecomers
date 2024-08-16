import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedNoSpecService } from './seed--no-spec.service';


@Controller('seed')
export class SeedNoSpecController {
  constructor(private readonly seedNoSpecService: SeedNoSpecService) {}

 @Get()
 executeDataProvider() {
    return this.seedNoSpecService.RunDataProvider();
 }

 
}
