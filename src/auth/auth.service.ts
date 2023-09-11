import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';
import { CipherService } from 'src/cipher/cipher.service';

@Injectable()
export class AuthService {
  constructor(
    private userSvc: UsersService,
    private tokenSvc: TokenService,
    private cipherSvc: CipherService,
  ) {}

  async logout(email: string): Promise<void> {
    this.userSvc.removeRefreshToken(email);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userSvc.getByEmail(username);

    if (!user) throw new NotFoundException('User not found');

    const isMatch = await this.cipherSvc.passCompare(password, user.password);
    console.log(isMatch);
    if (isMatch) {
      const tokens = await this.tokenSvc.getTokens(user._id, user.email);
      await this.userSvc.updateUserRefreshToken(
        user.email,
        tokens.refresh_token,
      );
      return {
        id: user._id,
        name: user.name,
        ...tokens,
      };
    }

    return null;
  }
}
