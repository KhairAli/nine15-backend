import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';

@Controller("/api/product")
export class ProuctController {
  constructor(private readonly productService: ProductService) { }

  @Get('/all')
  findProducts(): any {
    return this.productService.findProducts();
  }

  @Get('/price-history/:productId')
  async findPriceHistoryByProduct(@Param('productId') id: String): Promise<any> {
    console.log('Product Id', id)
    return this.productService.findPriceHistoryByProduct(id);
  }

  @Post('/price-history')
  savePriceHistoryByProduct(@Body() requestDTO: any): any {
    return this.productService.save(requestDTO);
  }
}
