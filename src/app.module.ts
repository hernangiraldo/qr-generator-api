import { Module } from '@nestjs/common';
import { QrModule } from './qr/qr.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DbModule, QrModule, AuthModule, UsersModule],
})
export class AppModule {}
