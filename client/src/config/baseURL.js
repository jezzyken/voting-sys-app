const config = {
  development: {
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3001/api/v1',
  },
  production: {
    baseURL: process.env.VUE_APP_API_BASE_URL || 'https://your-production-api.com/api/v1',
  },
};

const env = process.env.NODE_ENV || 'development';

export const baseURL = config[env].baseURL;
export const currentEnv = env;