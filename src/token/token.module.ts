import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { CipherModule } from 'src/cipher/cipher.module';

@Module({
  imports: [JwtModule.register({}), CipherModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
