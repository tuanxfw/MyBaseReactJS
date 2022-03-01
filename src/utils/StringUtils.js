import {App as AppConstants} from 'constants/Constants';

export const StringUtils = {
    checkEmailFormat,
    checkDateFormat,
    stringIsNullOrEmpty,
};

function checkEmailFormat (str) {

    if (str === null || str.trim() === "") {
        return false;
    }

    if (str.trim().match(AppConstants.REGEX.EMAIL) === false) {
        return false;
    }

    return true;
};

function checkDateFormat (str) {

    if (str === null || str.trim() === "") {
        return false;
    }

    if (str.trim().match(AppConstants.REGEX.DATE) === false) {
        return false;
    }

    return true;
};

function stringIsNullOrEmpty (string) {
    if (string === undefined || string === null || String(string) === "") return true
    return false
};