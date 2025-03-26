import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommonJSON from '../locale/en/common.json';
import esCommonJSON from '../locale/es/common.json';

const defaultNamespace = 'common';
const namespaces = ['common'];

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommonJSON,
    },
    es: {
      common: esCommonJSON,
    },
  },
  lng: 'en',
  ns: namespaces,
  defaultNS: defaultNamespace,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
