import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { EnvConfigService } from './env-config.service';

import config from '../env-config';

export class EnvConfigImplService extends EnvConfigService {
  constructor(
    @Inject(config.KEY)
    private dbConfig: ConfigType<typeof config>,
  ) {
    super();
  }

  get config(): any {
    return this.dbConfig;
  }
}
