import { ConfigType } from '@nestjs/config';

import config from '../env-config';

export abstract class EnvConfigService {
  abstract get config(): ConfigType<typeof config>;
}
