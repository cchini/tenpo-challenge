import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from '../locale/en.json';
import esJSON from '../locale/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    es: { ...esJSON },
  },
  lng: 'es',
});

export default i18n;
