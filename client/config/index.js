import development from '@config/development';
import production from '@config/production';

const nodeENV = process.env.NODE_ENV || 'development';

const env = { production, development }[nodeENV];

const config = {
  api: {
    host: env.API_HOST,
    server: env.SERVER_HOST,
    cryto: env.CRYPTOJS_SECRET,
  },
};

export default config;
