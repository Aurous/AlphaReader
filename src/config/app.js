const APP_CONFIG = {
  localhost: {
    // apiRoot: 'https://ryt7pxlc5h.execute-api.us-east-1.amazonaws.com/testing/account',
    apiRoot: 'https://manga.ryanhill.com',
  },
  production: {
    apiRoot: 'http://localhost:3000',
  },
};

const getAppConfig = () => {
  if (process.env.NODE_ENV === 'production') return APP_CONFIG.production;
  return APP_CONFIG.localhost;
};

const AppConfig = getAppConfig();

export default AppConfig;
