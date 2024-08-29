import { Module } from '@nestjs/common';
import { SeedNoSpecService } from './seed--no-spec.service';
import { SeedNoSpecController } from './seed--no-spec.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedNoSpecController],
  providers: [SeedNoSpecService],
  imports: [ ProductsModule,
    AuthModule
   ]
})
export class SeedNoSpecModule {}
