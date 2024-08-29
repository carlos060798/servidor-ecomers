import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';
import { ValidRole } from './auth/interface/valid-role';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Auth(ValidRole.admin)
  getHello(): string {
    return this.appService.getHello();
  }
}
