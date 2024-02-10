import { createI18n } from 'vue-i18n';
import config from '@/config';
import en from '@/i18n/en/Admin/en.json';

const i18n = createI18n({
    legacy: false, 
  locale: config.DEFAULT_LANGUAGE,
  fallbackLocale: config.DEFAULT_LANGUAGE,
  messages: {
    en
    // Add other languages as needed
  },
  silentFallbackWarn: true,
});

export default i18n;
