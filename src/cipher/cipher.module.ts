import { Module } from '@nestjs/common';
import { CipherService, CipherServiceImpl } from './cipher.service';

@Module({
  providers: [
    {
      provide: CipherService,
      useClass: CipherServiceImpl,
    },
  ],
  exports: [CipherService],
})
export class CipherModule {}
