import { Module } from '@nestjs/common';
import { QrModule } from './qr/qr.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CipherModule } from './cipher/cipher.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [QrModule, AuthModule, UsersModule, DbModule, CipherModule, TokenModule],
})
export class AppModule {}
