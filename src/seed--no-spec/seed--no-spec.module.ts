import { Module } from '@nestjs/common';
import { SeedNoSpecService } from './seed--no-spec.service';
import { SeedNoSpecController } from './seed--no-spec.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [SeedNoSpecController],
  providers: [SeedNoSpecService],
  imports: [ ProductsModule ]
})
export class SeedNoSpecModule {}
