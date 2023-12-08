import * as mongoose from 'mongoose';

export const PriceHistorySchema = new mongoose.Schema({
    variantId: String,
    variantTitle: String,
    sku: String,
    price: Number,
    createdAt: Date,
    updatedAt: Date,
    // Add other fields as needed
});