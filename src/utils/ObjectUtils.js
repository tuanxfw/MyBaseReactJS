

export const ObjectUtils = {
    objectIsNull,
    compareObject
};


function objectIsNull (obj) {
    if (
        obj === undefined 
        || obj === null 
    ){
        return true;
    }

    return false;
}

function compareObject (obj1, obj2) {
    if(JSON.stringify(obj1) === JSON.stringify(obj2)){
        return true;
    }

    return false;
}
