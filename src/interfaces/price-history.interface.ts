
export interface PriceHistory extends Document {
    readonly variantId: String,
    readonly variantName: String,
    readonly sku: String,
    readonly price: Number,
    readonly createdAt: String,
    readonly updatedAt: String,
    // Add other fields as needed
};