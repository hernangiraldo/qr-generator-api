import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { CipherModule } from 'src/cipher/cipher.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [CipherModule, UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
