import development from '@config/development';
import production from '@config/production';

const nodeENV = process.env.NODE_ENV || 'development';

const env = { production, development }[nodeENV];

const config = {
  api: {
    host: env.API_HOST,
    server: env.SERVER_HOST,
    cryto: env.CRYPTOJS_SECRET,
    midtrans: env.MIDTRANS_CLIENT_SERVER_KEY,
  },
};

export default config;
