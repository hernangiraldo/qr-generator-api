import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CipherService } from 'src/cipher/cipher.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UsersService {
  constructor(
    private cipherSvc: CipherService,
    @InjectModel('users') private readonly userModel: Model<User>,
    private tokenSvc: TokenService,
  ) {}

  async create(body: RegisterUserDto) {
    try {
      const newUser = new this.userModel();
      newUser.email = body.email;
      newUser.name = body.name;
      newUser.password = await this.cipherSvc.hashPasst(body.password);
      const createdUser = await this.userModel.create(newUser);
      const tokens = await this.tokenSvc.getTokens(
        createdUser._id,
        createdUser.email,
      );
      return {
        id: createdUser._id,
        name: createdUser.name,
        ...tokens,
      };
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Email already exists');
      }

      throw err;
    }
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUserRefreshToken(email: string, refreshToken: string) {
    this.userModel.findOneAndUpdate({ refreshToken, $where: email }).exec();
  }

  async removeRefreshToken(email: string) {
    this.userModel
      .findOneAndUpdate({ refreshToken: null, $where: email })
      .exec();
  }
}
