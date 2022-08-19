const DEFAULT_STRAVA_CLIENT_ID = '49241';
const DEFAULT_STRAVA_CLIENT_SECRET = '';
const DEFAULT_STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';

const config = {
  strava: {
    clientId:
      process.env.REACT_APP_STRAVA_CLIENT_ID ?? DEFAULT_STRAVA_CLIENT_ID,
    clientSecret:
      process.env.REACT_APP_STRAVA_CLIENT_SECRET ??
      DEFAULT_STRAVA_CLIENT_SECRET,
    authUrl: process.env.REACT_APP_STRAVA_AUTH_URL ?? DEFAULT_STRAVA_AUTH_URL,
    validScopes: ['read', 'activity:read'],
  },
};

export default config;
