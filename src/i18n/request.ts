import {getRequestConfig} from 'next-intl/server';

const config = getRequestConfig(async ({locale}) => {
  // Default to English if locale is undefined
  const resolvedLocale = locale || 'en';
  return {
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
    timeZone: 'Europe/Prague'
  };
});

export default config; 