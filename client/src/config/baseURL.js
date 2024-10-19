const config = {
  development: {
    baseURL: 'http://localhost:3001/api/v1',
  },
  production: {
    baseURL: 'https://gitvote.onrender.com/api/v1',
  },
};

const env = process.env.NODE_ENV || 'development';

export const baseURL = config[env].baseURL;
export const currentEnv = env;