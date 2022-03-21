const _ = require('lodash');

export const ObjectUtils = {
    objectIsNull,
    compareProps
};


function objectIsNull(obj) {
    if (
        obj === undefined
        || obj === null
    ) {
        return true;
    }

    return false;
}

function compareProps(obj1, obj2) {
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
}
