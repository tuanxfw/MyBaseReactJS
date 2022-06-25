
import { Config } from 'constants/Constants';

const pipe = (...func) => (data) => {
    return func.reduce((preVal, currentFunc) => {
        return currentFunc(preVal);
    }, data);
};

export const CommonUtils = {
    pipe,
};



