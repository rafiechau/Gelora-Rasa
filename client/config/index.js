import development from '@config/development';
import production from '@config/production';
import test from '@config/test.env';

const nodeENV = process.env.NODE_ENV || 'development';

const env = { production, development, test }[nodeENV];

const config = {
  api: {
    host: env.API_HOST,
    server: env.SERVER_HOST,
    cryto: env.CRYPTOJS_SECRET,
    midtrans: env.MIDTRANS_CLIENT_SERVER_KEY,
    vidioSdk: env.TOKEN_SDK,
    hostStreaming: env.URL_STREAMING,
  },
};

export default config;
