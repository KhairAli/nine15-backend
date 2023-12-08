import { Connection } from 'mongoose';
import { ProductPriceHistorySchema } from './schemas/product.schema'

export const ProductProviders = [
    {
        provide: 'PRODUCT_MODEL',
        useFactory: (connection: Connection) => connection.model('ProductPriceHistory', ProductPriceHistorySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];