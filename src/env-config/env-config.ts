import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    db: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      prod: Boolean(process.env.PROD),
    },
    jwt: {
      secretKey: process.env.TOKEN_SECRET_KEY,
      accesTokenTime: process.env.ACCESS_TOKEN_SECRET_EXPIRATION_TIME,
      refreshTokenTime: process.env.REFRESH_TOKEN_SECRET_EXPIRATION_TIME,
    },
  };
});
