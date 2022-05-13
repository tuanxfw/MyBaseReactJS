
import { Config } from 'constants/Constants';

const _ = require('lodash');

export const ObjectUtils = {
    compareProps
};

function compareProps(obj1, obj2) {
    if (Config.MODE === "development") {
        return false;
    }

    if (String(typeof obj1) !== "object" && String(typeof obj2) !== "object") {
        return;
    }
    
    let fieldObj1 = _.keys(obj1);
    let fieldObj2 = _.keys(obj2);

    if (!_.isEqual(fieldObj1, fieldObj2)) {
        return false;
    }

    let result = true;
    for (let index = 0; index < fieldObj1.length; index++) {
        const field = fieldObj1[index];
        
        if (String(typeof obj1[field]) !== "function")
        {
            try {
                result = JSON.stringify(obj1[field]) === JSON.stringify(obj2[field]);
            } 
            catch (error) {
                result = _.isEqual(obj1[field], obj2[field]);
            }

            if (!result) {
                break;
            }
        }
    }

    return result;
};

function compareObjectValue(obj1, obj2, fnCompare) {
    let values1 = _.values(obj1);
    let values2 = _.values(obj2);

    if (!fnCompare) {
        fnCompare = (value1, value2) => {
           return _.toString(value1) === _.toString(value2)
        };
    }

    let result = true;

    for (let i = 0; i < values1.length; i++) {
        if (!fnCompare(values1[i], values2[i])) {
            result = false;
            break;
        }
    }

    return result;
};