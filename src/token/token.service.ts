import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CipherService } from 'src/cipher/cipher.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtSvc: JwtService,
    private cipherSvc: CipherService,
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
          secret: 'secret',
          expiresIn: '15m',
        },
      ),
      this.jwtSvc.signAsync(
        {
          sub: enc.toString(),
        },
        {
          secret: 'secret',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
