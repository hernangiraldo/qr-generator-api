import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'root',
      pass: 'root',
      dbName: 'qr-db',
    }),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
