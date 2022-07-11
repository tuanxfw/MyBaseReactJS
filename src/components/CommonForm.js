import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import useFocusError from "hooks/form/useFocusError";
import useFocusFirstElement from "hooks/form/useFocusFirstElement";
import useConsoleLog from 'hooks/form/useConsoleLog';

const CommonForm = ({
    errors: p_errors,
    watch: p_watch,
    ...props
}) => {

    const ref_nameForm = useRef(uuidv4())

    useFocusFirstElement(ref_nameForm.current);
    useFocusError(ref_nameForm.current, p_errors);
    useConsoleLog(p_watch);

    return (
        <form
            name={ref_nameForm.current}
            autoComplete='off'
            {...props}
        />
    );
}

export default CommonForm;

CommonForm.defaultProps = {
    watch: () => { }
}