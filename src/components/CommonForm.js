import React, {useEffect, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';

import useFocusError from "hooks/form/useFocusError";
import { CommonUtils } from "utils/CommonUtils";

const CommonForm = (props) => {
    const ref_nameForm = useRef(uuidv4())

    useEffect(() => {
        CommonUtils.focusFirstElementInForm(ref_nameForm.current);
    }, []);

    useFocusError(ref_nameForm.current, props.errors);

    return (
        <form 
        name={ref_nameForm.current}
        autoComplete='off'
        {...props}/>
    );
}

export default CommonForm;
