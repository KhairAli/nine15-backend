import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ProductPriceHistory } from './interfaces/product.interface';
import { ProductDTO } from './dto/product.dto';
import { ProductModule } from './product.module';
import { PriceHistory } from './interfaces/price-history.interface';


@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productPriceHistoryModel: Model<ProductPriceHistory>
    ) { }

    async save(productRequest: any): Promise<ProductPriceHistory> {
        let model = this.transformedJson(productRequest);
        let product = await this.findPriceHistoryByProduct(productRequest.id);
        const productModel = new this.productPriceHistoryModel(model);
        if (!product) {
            console.log(model);
            console.log("******************000000000000000000**********************");
            return productModel.save();
        } else {
            productRequest.variants.forEach(async variant => {
                let variantHistory = [...product.priceHistories.filter(d => d.variantId == variant.id)];
                let recentHistory = this.getMostRecentEntry(variantHistory)
                console.log(recentHistory, variant.price)
                if (recentHistory !== undefined && recentHistory.price != variant.price) {
                    let v = await this.productPriceHistoryModel.findOneAndUpdate({ productId: product.productId },
                        { $push: { priceHistories: this.mapToVariantModel(variant) } },
                        { new: true }
                    ).exec();
                }
            });
            console.log("000000000000000000000000000000000000000000000000000")
            return productModel;
        }
    }

    async findPriceHistoryByProduct(id: String): Promise<any> {
        return await this.productPriceHistoryModel.findOne({ productId: id });
    }

    async findProducts(): Promise<ProductPriceHistory[]> {
        return await this.productPriceHistoryModel.find();
    }

    getMostRecentEntry(priceHistories: any[]): PriceHistory {
        if (priceHistories.length == 1) {
            return priceHistories[0];
        }
        return priceHistories.reduce((latest, item) => {
            if (item.updatedAt && (!latest || new Date(item.updatedAt) > new Date(latest.updatedAt))) {
                return item;
            }
            return latest;
        }, null) as PriceHistory;
    }

    transformedJson(requestDTO: any) {
        return {
            productId: requestDTO.id.toString(),
            productName: requestDTO.title,
            createdAt: requestDTO.created_at,
            updatedAt: requestDTO.updated_at,
            priceHistories: requestDTO.variants.map(variant => (this.mapToVariantModel(variant)))
        } as ProductPriceHistory;
    };

    mapToVariantModel(variant: any) {
        return {
            variantId: variant.id.toString(),
            variantName: variant.title,
            sku: variant.sku,
            price: parseFloat(variant.price),
            createdAt: variant.created_at,
            updatedAt: variant.updated_at
        };
    };

    variantMap(variants) {
        return variants.reduce((map, variant) => {
            map[variant.id] = variant;
            return map;
        }, {});
    }
}
