import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { Language } from "translation/language";
import { Config } from 'constants/Constants';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false
    },
    fallbackLng: Language.defaultLang.ns,
    debug: false,
    lng: Language.defaultLang.ns,
    ns: "common",
    defaultNS: "common",

    backend: {
      // for all available options read the backend's repository readme file
      loadPath: Config.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json'
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;