import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { CipherModule } from 'src/cipher/cipher.module';
import { EnvConfigModule } from 'src/env-config';

@Module({
  imports: [JwtModule.register({}), CipherModule, EnvConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
