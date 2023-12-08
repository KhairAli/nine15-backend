export interface ProductDTO {
    shopifyProductId: String;
    createdAt: String;
    updatedAt: String;
    variants: VariantDTO[];
}

export interface VariantDTO {
    variantId: String,
    price: Number;
    createdAt: String;
    updatedAt: String;
}