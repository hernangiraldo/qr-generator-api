import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CipherService } from 'src/cipher/cipher.service';
import { EnvConfigService } from 'src/env-config';

@Injectable()
export class TokenService {
  constructor(
    private jwtSvc: JwtService,
    private cipherSvc: CipherService,
    private envConfigSvc: EnvConfigService,
  ) {}

  async getTokens(
    userId: number,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const jwtPayload = {
      sub: userId,
      email: email,
    };
    const enc = this.cipherSvc.aesEncrypt(JSON.stringify(jwtPayload));

    const [at, rt] = await Promise.all([
      this.jwtSvc.signAsync(
        {
          sub: enc.toString(),
        },
        {
          secret: this.envConfigSvc.config.jwt.secretKey,
          expiresIn: this.envConfigSvc.config.jwt.accesTokenTime,
        },
      ),
      this.jwtSvc.signAsync(
        {
          sub: enc.toString(),
        },
        {
          secret: this.envConfigSvc.config.jwt.secretKey,
          expiresIn: this.envConfigSvc.config.jwt.refreshTokenTime,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
