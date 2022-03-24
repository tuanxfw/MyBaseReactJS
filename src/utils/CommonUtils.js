
import { Config } from 'constants/Constants';

const handleChangeValue = (setState) => (fieldName) => (e) => {
    setState((prev) => {

        if (Config.MODE === "development") {
            console.log('handleChangeValue', fieldName, e)
        }
        
        let nextState = {...prev};

        nextState[fieldName] = e.target?.value ?? e?.value ?? e;

        return nextState;
    });
};

export const CommonUtils = {
    handleChangeValue,
};

