import pt from './pt';
import en from './en';

const i18NConfig = {
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'en',
  messages: {
    pt: pt.messages,
    en: en.messages,
  },
  numberFormats: {
    pt: pt.numberFormat,
    en: en.numberFormat,
  }
};

export default i18NConfig;
