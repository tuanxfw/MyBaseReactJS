import React, { useEffect, useState } from "react";
import { DatePicker } from 'antd';
import { DateUtils } from 'utils/DateUtils';

const CommonDatePicker = (props) => {
    const [s_value, s_setValue] = useState(null);

    useEffect(() => {
        let value = null;

        if (props.value) {
            value = DateUtils.convertStringToDate(props.value, props.format.inputFormat)
        }

        s_setValue(value);
    }, [props]);

    const onChange = (e) => {
        try {

            let result = null;

            if (e !== null && e._d !== null) {
                result = DateUtils.convertDateToString(e._d, props.format.outputFormat);
            }

            props.onChange(result);

        } catch (exception) {
            console.log(exception);
        }
    };

    return (
        <>
            <DatePicker
                {...props}
                getPopupContainer={() => document.getElementById("parent-" + props.id)}
                placeholder={props.format.viewFormat}
                format={[props.format.viewFormat]}
                value={s_value}
                onChange={onChange} />
        </>
    );
}

export default CommonDatePicker;