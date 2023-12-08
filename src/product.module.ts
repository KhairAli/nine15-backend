import { Module } from '@nestjs/common';
import { ProuctController } from './product.controller';
import { ProductService } from './product.service';
import { ProductProviders } from './product.providers';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProuctController],
  providers: [
    ProductService,
    ...ProductProviders,
  ],
})
export class ProductModule { }