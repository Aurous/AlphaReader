const APP_CONFIG = {
  localhost: {
    apiRoot: 'http://localhost:3000',
  },
  production: {
    apiRoot: 'https://manga.ryanhill.com',
  }
};

const getAppConfig = () => {
  if (process.env.NODE_ENV === 'production') return APP_CONFIG.production;
  return APP_CONFIG.localhost;
};

const AppConfig = getAppConfig();

export default AppConfig;
