import moment from 'moment';
import 'moment/locale/en-nz';
import 'moment/locale/vi';

import vi_VN from "antd/lib/locale/vi_VN";
import en_US from "antd/lib/locale/en_US";

const find = require('lodash/find');

const lang = [
    {
        name: "Tiếng việt",
        ns: "vi",
        antd: vi_VN,
        moment: "vi"
    },
    {
        name: "English",
        ns: "en",
        antd: en_US,
        moment: "en-nz"
    },
];

const defaultLang = lang[0];

export const Language = {
    lang,
    defaultLang,
    changeLanguage,
};

function changeLanguage(i18n) {
    
    let langItem = find(lang, {ns: i18n.language}) || defaultLang;

    moment.locale(langItem.moment);

    return langItem;
};