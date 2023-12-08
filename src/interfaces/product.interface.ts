import { Document } from 'mongoose';
import { PriceHistory } from './price-history.interface';

export interface ProductPriceHistory extends Document {
    readonly productId: String;
    readonly productName: String;
    readonly price: Number;
    readonly createdAt: String;
    readonly updatedAt: String;
    readonly priceHistories: PriceHistory[];
}