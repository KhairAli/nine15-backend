import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://spartan:XeOq12e6404DEKDm@cluster0.o1qhy.mongodb.net/nine15'),
  },
];