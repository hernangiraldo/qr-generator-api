import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { EnvConfigImplService, EnvConfigService } from './service';

import config from './env-config';
import { environments } from './environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        PROD: Joi.boolean().required(),
      }),
    }),
  ],
  exports: [EnvConfigService],
  providers: [
    {
      provide: EnvConfigService,
      useClass: EnvConfigImplService,
    },
  ],
})
export class EnvConfigModule {}
