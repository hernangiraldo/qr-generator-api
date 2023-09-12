import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule, EnvConfigService } from 'src/env-config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (envConfigSvc: EnvConfigService) => {
        const { db } = envConfigSvc.config;
        const { type, host, port, username, password, database } = db;
        return {
          uri: `${type}://${host}:${port}`,
          user: username,
          pass: password,
          dbName: database,
        };
      },
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
    }),
  ],
})
export class DbModule {}
