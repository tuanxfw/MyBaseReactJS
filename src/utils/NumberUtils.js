
import {App as AppConstant} from 'constants/Constants';

export const NumberUtils = {
    parseToFloat,
    parseToInt,
    formatToNumberString,
    getValueFromNumberString,
};

/*
decimal: làm tròn tới hàng thập phân thứ bao nhiêu. vd: [ 0 là .không lấy thập phân ] [ 10 là .0 ]  [ 100 là .00 ] [ 1000 là .000 ]
*/
function parseToFloat (value, defaultValue, decimal = 100) {
    let float = parseFloat(value);

    if (String(float) === 'NaN'){
        float = defaultValue;
    }
    else if (decimal !== 0){
        float = Math.round(float * decimal)/decimal;
    }

    return float;
}

function parseToInt (value, defaultValue) {
    let int = parseInt(value);

    if (String(int) === 'NaN'){
        int = defaultValue;
    }

    return int;
}

function formatToNumberString (valueNumber, decimalSeparator = AppConstant.NUMBER_FORMAT.DECIMAL_SEPARATOR, thousandSeparator = AppConstant.NUMBER_FORMAT.THOUSAND_SEPARATOR) {
    valueNumber += '';
    valueNumber = valueNumber.split(decimalSeparator);

    if (valueNumber[0].length > 3) {
        valueNumber[0] = valueNumber[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousandSeparator);
    }
    return valueNumber.join(decimalSeparator);
}

function getValueFromNumberString (stringNumber, decimal = 100, decimalSeparator = AppConstant.NUMBER_FORMAT.DECIMAL_SEPARATOR, thousandSeparator = AppConstant.NUMBER_FORMAT.THOUSAND_SEPARATOR) {
    stringNumber += '';
    stringNumber = stringNumber.split(decimalSeparator);

    if (stringNumber[0]) {
        stringNumber[0] = stringNumber[0].replace(thousandSeparator, '');
    }

    return parseToFloat(stringNumber.join('.'), 0, decimal);
}

