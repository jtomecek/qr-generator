import { getRequestConfig } from 'next-intl/server';

const config = getRequestConfig(async ({ locale }) => {
  // Default to English if locale is undefined
  const resolvedLocale = locale || 'en';
  return {
    messages: await import(`../messages/${resolvedLocale}.json`),
    timeZone: 'Europe/Prague',
    locale: resolvedLocale, // Ensure the locale is included in the returned object
  };
});

export default config;