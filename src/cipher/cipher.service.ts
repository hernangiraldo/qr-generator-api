import { Injectable } from '@nestjs/common';
import { AES } from 'crypto-js';
import * as bcrypt from 'bcrypt';

export abstract class CipherService {
  abstract aesEncrypt(value: string): string;
  abstract aesDecrypt(value: string): string;
  abstract hashPasst(value: string): Promise<string>;
  abstract passCompare(hash: string, value: string): Promise<boolean>;
}

@Injectable()
export class CipherServiceImpl extends CipherService {
  aesEncrypt(value: string): string {
    return AES.encrypt(value, 'secret').toString();
  }

  aesDecrypt(value: string): string {
    return AES.decrypt(value, 'secret').toString();
  }

  hashPasst(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  passCompare(hash: string, value: string): Promise<boolean> {
    return bcrypt.compare(hash, value);
  }
}
