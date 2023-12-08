import * as mongoose from 'mongoose';
import { PriceHistorySchema } from './price-history.schema';


export const ProductPriceHistorySchema = new mongoose.Schema({
    productId: String,
    productName: String,
    price: Number,
    createdAt: Date,
    updatedAt: Date,
    priceHistories: [PriceHistorySchema]
});
