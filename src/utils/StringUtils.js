import { App as AppConstants } from 'constants/Constants';

const _ = require('lodash');

export const StringUtils = {
    checkEmailFormat,
    checkDateFormat,
    getBytesString,
    compareString,
};

function checkEmailFormat(str) {

    if (str === null || str.trim() === "") {
        return false;
    }

    if (str.trim().match(AppConstants.REGEX.EMAIL) === false) {
        return false;
    }

    return true;
};

function checkDateFormat(str) {

    if (str === null || str.trim() === "") {
        return false;
    }

    if (str.trim().match(AppConstants.REGEX.DATE) === false) {
        return false;
    }

    return true;
};

function compareString(targetStr, str, mode) {
    let result = false;

    targetStr = _.toLower(_.toString(targetStr));
    str = _.toLower(_.toString(str));

    switch (mode) {
        case "equals":
            result = targetStr === str;
            break;

        case "notEquals":
            result = !(targetStr === str);
            break;

        case "notContains":
            result = !(str.includes(targetStr));
            break;

        case "startWith":
            result = _.startsWith(str, targetStr);
            break;

        case "endWith":
            result = _.endsWith(str, targetStr);
            break;

        default: //"contains"
            result = str.includes(targetStr);
            break;
    }

    return result;
};

function getBytesString(value) {
    value = _.toString(value);
    
    let m = encodeURIComponent(value).match(/%[89ABab]/g);
    let bytes = value.length + (m ? m.length : 0);

    return bytes
};